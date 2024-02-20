import assert from 'assert';
import { after, now } from 'underscore';
import fastTimeout from './fastTimeout.js';

describe('fastTimeout', function() {
    it('can schedule a task', function(done) {
        fastTimeout(done);
    });

    it('can pass arguments', function(done) {
        function testMe(a, b, c) {
            assert(a === 1 && b === 'xyz' && c === null);
            done()
        }
        fastTimeout(testMe, 1, 'xyz', null);
    });

    it('is faster than setTimeout', function(done) {
        var fast, normal, finish;

        function downcounter(method) {
            var remaining = 10;
            function countDown() {
                if (--remaining) return method(countDown);
                countDown.endTime = now();
                finish();
            }
            return countDown;
        }

        fast = downcounter(fastTimeout);
        normal = downcounter(setTimeout);
        finish = after(2, function() {
            assert(fast.endTime < normal.endTime);
            done();
        });

        // We even give setTimeout a head start!
        setTimeout(normal);
        fastTimeout(fast);
    });
});
