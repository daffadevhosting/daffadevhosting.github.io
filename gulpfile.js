const {src, dest, watch, series } = require('gulp')
const cleanCss = require('gulp-clean-css')
const sass = require('gulp-sass')(require('sass'))

function buildStyles() {
    return src('_sass/**/*.scss')
        .pipe(sass({
            includePaths: ['node_modules'],
         }).on('error', sass.logError))
        .pipe(cleanCss())
        .pipe(dest('assets/css/'))
}

function watchTask() {
    watch(['assets/sass/**/*.scss'], buildStyles)
}

exports.default = series(buildStyles, watchTask)