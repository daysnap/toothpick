import { isFunction } from '@daysnap/utils';
export function hijack(fn, callback) {
    const consoleFn = console[fn];
    if (isFunction(consoleFn)) {
        console[fn] = function (...args) {
            callback(fn, ...args);
            consoleFn.apply(console, args);
        };
    }
}
