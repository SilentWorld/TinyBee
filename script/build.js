const gulp = require('gulp');
const postcss = require('gulp-postcss');
const cssmin = require('gulp-clean-css');
const rename = require('gulp-rename');
const gutil = require('gulp-util');
const removeLogging = require('gulp-remove-logging');
const babel = require('gulp-babel');
var less = require('gulp-less');

const options = gutil.env;
const isProduction = process.env.NODE_ENV === 'production';

gulp.task('compile-css', () => {
    return (
        gulp
            .src(['../src/**/*.less', '!../src/**/_*.less'])
            .pipe(less())
            .pipe(postcss())
            //.pipe(cssmin())
            .pipe(
                rename(path => {
                    path.extname = '.acss';
                })
            )
            .pipe(gulp.dest(options.dist))
    );
});

gulp.task('compile-js', () => {
    return gulp
        .src(['../src/**/*.js'])
        .pipe(
            removeLogging({
                methods: isProduction ? ['log', 'info'] : []
            })
        )
        .pipe(babel())
        .pipe(gulp.dest(options.dist));
});

gulp.task('compile-index-js', () => {
    return (
        gulp
            .src(['../index.js'])
            //.pipe(
            //    removeLogging({
            //        methods: isProduction ? ['log', 'info'] : []
            //    })
            //)
            .pipe(babel())
            .pipe(gulp.dest(options.dist + '/..'))
    );
});

gulp.task(
    'build',
    gulp.series('compile-css', 'compile-index-js', 'compile-js', function() {
        console.log('--------finish all------------');
        return Promise.resolve();
    })
);
