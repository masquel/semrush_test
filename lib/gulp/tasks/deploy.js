var gulp = require('gulp'),
	ghPages = require('gulp-gh-pages'),
	config   = require('../config').deploy;

gulp.task('deploy', function(){
	gulp.src(config.src+"/**/*")
	.pipe(ghPages());
})	