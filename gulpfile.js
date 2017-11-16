(function () {
    'use strict';

     var gulp = require('gulp');
     var browserSync = require('browser-sync');
     var $ = require ('gulp-load-plugins')({lazy:true});
    gulp.task('default', ['compile-css', 'compile-html', 'start-browserSync'], function () {
        gulp.watch(['src/sass/*.scss','src/sass/*/*.scss'], ['compile-css']);
        gulp.watch(['src/html/*html', 'src/html/*/*.html'], ['compile-html', browserSync.reload]);
    });

    gulp.task('compile-css', function(){
        gulp.src('src/sass/*.scss')
            .pipe($.sass({
                outputStyle: 'expanded', //values: nested, expanded, compact, compressed
                errLogToConsole: true,
                sourceComments: true}))
            .pipe(gulp.dest('css/'))
            .pipe(browserSync.reload({stream:true}));
    });

    gulp.task('compile-html', function () {
        gulp.src('src/html/*.html')
            .pipe($.preprocess())
            .pipe(gulp.dest(''));
    });

    gulp.task('start-browserSync', function () {
        browserSync({
            server: {
                baseDir: '',
                directory: true,
                index:"index.html"
            },
            open: false,
            notify: true,
            port: 3010,
            ui: false
        });
    });

    var gulp_src = gulp.src;
    gulp.src = function () {
        return gulp_src.apply(gulp, arguments)
            .pipe($.plumber(function (error) {
                $.util.log($.util.colors.red('Error( ' + error.plugin + ' ):' + error.message));
                this.emit('end');
            }));
    };


}());