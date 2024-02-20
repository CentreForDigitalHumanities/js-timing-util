# @dhl-uu/timing-util

Timing utilities for JavaScript.

[Rationale](#rationale) | [Quickstart](#quickstart) | [Compatibility](#compatibility) | [Reference](#reference) | [Planned](#planned-features) | [Support](#support) | [Development](CONTRIBUTING.md) | [BSD 3-Clause](LICENSE)

## Rationale

The functions in this package offer new ways to postpone the execution of a callback function to some later point in time. Specifically:

- **`fastTimeout`** is similar to the built-in [`setTimeout`][setTimeout] in the sense that it lets you postpone a function call until a later cycle of the event loop. However, callbacks scheduled with `setTimeout` will be throttled by the browser if they occur too often. `fastTimeout` uses [`postMessage`][postMessage] under the hood in order to avoid this throttling effect. The end result is that you can make many deferred callbacks in performance-critical code without causing obvious delays for the user.
- *Other functions* are [planned](#planned-features).

[setTimeout]: https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
[postMessage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage

## Quickstart

``` bash
npm add @dhl-uu/timing-util
```

``` javascript
import fastTimeout from '@dhl-uu/timing-util/fastTimeout.js';

fastTimeout(someFunction, ...args);
```

## Compatibility

While `fastTimeout` is based on `postMessage`, it automatically falls back to `setImmediate` in environments where that function is defined. Hence, you can transparently use it in Node.js as well.

## Reference

### Module `fastTimeout.js`

#### Function `fastTimeout` (default export)

`fastTimeout(callback, ...args)` will schedule the function `callback` for a later cycle of the event loop. If you pass any `args`, these are passed to `callback` when it runs, in effect deferring the call `callback(...args)`. This is almost equivalent to `setTimeout(callback, 0, ...args)`, except that calls to `setTimeout` are throttled by the browser while calls to `fastTimeout` are not. In general, this saves several milliseconds per repetition.

While `fastTimeout` is not throttled, there is still no guarantee that it will run within any particular time frame. If other events happen in the meantime which trigger long-running code, there can be an indefinite amount of delay between your call to `fastTimeout` and the actual callback invocation. In this sense, `fastTimeout` is no faster than `setTimeout.`

## Planned features

- `softDebounce`: pool all calls to a function in the current event loop cycle, then execute it once at the end of the same cycle as a microtask.
- `throttlePerFrame`: pool calls to a function and execute it only once per animation frame.
- `debounceUntilIdle`: pool calls to a function. Wait with executing the function until the browser is idle.
- `debounceUntilTrigger`: common underlying implementation for the previous three functions. The function is only executed with the pooled arguments when a custom event triggers.

## Support

Please report security issues to cdh@uu.nl. For regular bugs, feature requests or any other feedback, please use our [issue tracker][issues].

[issues]: https://github.com/CentreForDigitalHumanities/js-timing-util/issues

## Development

Please see the [CONTRIBUTING](CONTRIBUTING.md) for everything related to testing, pull requests, versioning, etcetera.

## License

Licensed under the terms of the three-clause BSD license. See [LICENSE](LICENSE).
