import { restArguments } from 'underscore';

// The code in this module was inspired on the following blog post:
// https://dbaron.org/log/20100309-faster-timeouts
// In this module, we use a different name, enable passing arguments and use ES6
// syntax.

var timeouts = '_fastTimeoutRegistry';
var messageName = 'fast-timeout-message';

function handleMessage(event) {
    if (event.source === self && event.data === messageName) {
        event.stopPropagation();
        if (self[timeouts].length > 0) {
            var job = self[timeouts].shift();
            job.fn.apply(null, job.args);
        }
    }
}

// Like setTimeout, but takes no time argument (always zero) and is faster in
// real browsers. setTimeout is throttled to 2-10 ms intervals.
var fastTimeout = restArguments(function(fn, args) {
    self[timeouts].push({fn: fn, args: args});
    self.postMessage(messageName, '*');
});

function enable() {
    if (timeouts in self) return fastTimeout;
    Object.defineProperty(self, timeouts, {
        value: [],
        configurable: false,
        enumerable: false,
        writable: false,
    });
    self.addEventListener('message', handleMessage, true);
    return fastTimeout;
}

var hasSetImmediate = (typeof setImmediate === 'function');

export default hasSetImmediate ? setImmediate : enable();
