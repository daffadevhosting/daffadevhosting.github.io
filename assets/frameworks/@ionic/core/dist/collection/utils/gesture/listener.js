/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
export const addEventListener = (el, // TODO(FW-2832): type
eventName, callback, opts) => {
    // use event listener options when supported
    // otherwise it's just a boolean for the "capture" arg
    const listenerOpts = supportsPassive(el)
        ? {
            capture: !!opts.capture,
            passive: !!opts.passive,
        }
        : !!opts.capture;
    let add;
    let remove;
    if (el['__zone_symbol__addEventListener']) {
        add = '__zone_symbol__addEventListener';
        remove = '__zone_symbol__removeEventListener';
    }
    else {
        add = 'addEventListener';
        remove = 'removeEventListener';
    }
    el[add](eventName, callback, listenerOpts);
    return () => {
        el[remove](eventName, callback, listenerOpts);
    };
};
const supportsPassive = (node) => {
    if (_sPassive === undefined) {
        try {
            const opts = Object.defineProperty({}, 'passive', {
                get: () => {
                    _sPassive = true;
                },
            });
            node.addEventListener('optsTest', () => {
                return;
            }, opts);
        }
        catch (e) {
            _sPassive = false;
        }
    }
    return !!_sPassive;
};
let _sPassive;
