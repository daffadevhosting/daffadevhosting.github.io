/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
'use strict';

/**
 * Returns `true` if the document or host element
 * has a `dir` set to `rtl`. The host value will always
 * take priority over the root document value.
 */
const isRTL = (hostEl) => {
    if (hostEl) {
        if (hostEl.dir !== '') {
            return hostEl.dir.toLowerCase() === 'rtl';
        }
    }
    return (document === null || document === void 0 ? void 0 : document.dir.toLowerCase()) === 'rtl';
};

exports.isRTL = isRTL;
