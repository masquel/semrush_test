"use strict";

var gulp = require('gulp');

gulp.task('bundle', ['scripts', 'css', 'html', 'copy', 'connect'], function() {
  if (devBuild) global.doBeep = true;
});

gulp.task('build', ['clean', 'lint'], function() {
  gulp.start('bundle');
});
