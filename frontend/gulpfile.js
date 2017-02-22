'use strict';

var gulp = require('gulp'),
  connect = require('gulp-connect');

gulp.task('connect', function () {
  connect.server({
    root: ['.'],
    port: 8081,
    livereload: true
  });
});

gulp.task('watch', ['connect'], function () {
  gulp.watch(['index.*'], function () {
    gulp.src(['index.*'])
      .pipe(connect.reload());
  })
});

gulp.task('default', ['watch']);
