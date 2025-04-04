/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
export const SIZE_TO_MEDIA = {
    xs: '(min-width: 0px)',
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 992px)',
    xl: '(min-width: 1200px)',
};
// Check if the window matches the media query
// at the breakpoint passed
// e.g. matchBreakpoint('sm') => true if screen width exceeds 576px
export const matchBreakpoint = (breakpoint) => {
    if (breakpoint === undefined || breakpoint === '') {
        return true;
    }
    if (window.matchMedia) {
        const mediaQuery = SIZE_TO_MEDIA[breakpoint];
        return window.matchMedia(mediaQuery).matches;
    }
    return false;
};
