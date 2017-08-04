var gulp = require('gulp');

var gutil = require('gulp-util'),
	gconcat = require('gulp-concat'),
	browserify = require('gulp-browserify')
	compass = require('gulp-compass');

gulp.task('log', function() {
	gutil.log("Workflow generate: START");
});

var jsSources = ['components/scripts/script1.js','components/scripts/script2.js','components/scripts/script3.js'];
var sassSources = ['components/sass/style.scss'];

gulp.task('js', function() {
	gulp.src(jsSources)
		.pipe(gconcat('script.js'))
		.pipe(browserify())
		.pipe(gulp.dest('builds/development/js'));
});

gulp.task('sass', function() {
	gulp.src(sassSources)
		.pipe(compass({
			sass: 'components/sass',
			image: 'builds/development/images',
			style: 'expanded'
		}))
		.on('error', gutil.log)
		.pipe(gulp.dest('builds/development/css'))
});