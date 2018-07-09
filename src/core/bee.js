import connect from './connect.js';
console.log('-------', my);

let proxy = AFAppX.$global.bridge;

const TinyBee = {
    origin: proxy,
    _promiseCache: {},
    get app() {
        return AFAppX.getApp();
    },

    get currentPages() {
        return getCurrentPages();
    },

    asyncApi(key, options = {}) {
        return new Promise((resolve, reject) => {
            Object.assign(options, {
                success(...args) {
                    resolve(...args);
                },
                fail(err) {
                    debugger;
                    if (err && err.errMsg) {
                        reject(err.errMsg);
                    } else {
                        reject(err);
                    }
                }
            });
            proxy[key](options);
        });
    }
};

const strats = {};
/**
 * Data
 */

strats.data = function data(target, source) {
    return Object.assign(target, source);
};

function mergeHook(target, source) {
    if (typeof source === 'function') {
        if (typeof target === 'function') {
            return function mergedFuncion() {
                source.call(this);
                target.call(this);
            };
        }
        return source;
    }
    return target;
}

['onLoad', 'onReady', 'onShow', 'onHide', 'onUnload'].forEach(hook => {
    strats[hook] = mergeHook;
});

/**
 * Default strategy.
 */
function defaultStrat(target, source) {
    return source === undefined ? target : source;
}

function mergeOptions(target, ...args) {
    const hasOwn = Object.prototype.hasOwnProperty;
    if (target) {
        args.forEach(source => {
            if (source) {
                for (const key in source) {
                    if (hasOwn.call(source, key)) {
                        const strat = strats[key] || defaultStrat;
                        if (key === 'data' && target[key] == undefined) {
                            target[key] = {};
                        }
                        target[key] = strat(target[key], source[key], key);
                    }
                }
            }
        });
    }
    return target;
}

export { mergeOptions, connect };

export default TinyBee;
