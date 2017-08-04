var gulp = require('gulp');

var gutil = require('gulp-util'),
	gconcat = require('gulp-concat'),
	browserify = require('gulp-browserify')
	compass = require('gulp-compass')
	connect = require('gulp-connect');

gulp.task('log', function() {
	gutil.log("Workflow generate: START");
});

gulp.task('notify-updates', function() {
	console.log('assets updated');
});

var jsSources = ['components/scripts/script1.js','components/scripts/script2.js','components/scripts/script3.js'];
var sassSources = ['components/sass/style.scss'];
var htmlSources = ['builds/development/*.html'];

gulp.task('js', function() {
	gulp.src(jsSources)
		.pipe(gconcat('script.js'))
		.pipe(browserify())
		.pipe(gulp.dest('builds/development/js'))
		.pipe(connect.reload());
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
		.pipe(connect.reload());
});

gulp.task('html', function() {
	gulp.src(htmlSources)
		.pipe(connect.reload());
});

gulp.task('connect', function() {
	connect.server({
		root: 'builds/development',
		livereload: true
	});
});

gulp.task('watch', function() {
	gulp.watch(jsSources, ['js', 'notify-updates']);
	gulp.watch(sassSources, ['sass', 'notify-updates']);
	gulp.watch('components/sass/partials/*.scss', ['sass', 'notify-updates']);
	gulp.watch(htmlSources, ['html', 'notify-updates']);
});

gulp.task('default', ['log', 'js', 'sass', 'html', 'connect', 'watch']);