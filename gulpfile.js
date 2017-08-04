var gulp = require('gulp');

var gutil = require('gulp-util'),
	gconcat = require('gulp-concat');

gulp.task('log', function() {
	gutil.log("Workflow generate: START");
});

var jsSources = ['components/scripts/script1.js','components/scripts/script2.js','components/scripts/script3.js'];

gulp.task('process-js', function() {
	gulp.src(jsSources)
		.pipe(gconcat('script.js'))
		.pipe(gulp.dest('builds/development/js'));
});