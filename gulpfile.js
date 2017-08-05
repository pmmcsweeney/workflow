var gulp = require('gulp');

var gutil = require('gulp-util'),
	gconcat = require('gulp-concat'),
	browserify = require('gulp-browserify')
	compass = require('gulp-compass')
	connect = require('gulp-connect')
	gulpif = require('gulp-if')
	uglify = require('gulp-uglify'),
	htmlmin = require('gulp-htmlmin');

var env,
	jsSources,
	sassSources,
	htmlSources,
	outputDir,
	sassStyle;


env = process.env.NODE_ENV || 'development';

if(env === 'development') {
	gutil.log("Environment: DEVELOPMENT");
	outputDir = "builds/development";
	sassStyle = "expanded";
} else {
	gutil.log("Environment: PRODUCTION");
	outputDir = "builds/production";
	sassStyle = "compressed";
}

jsSources = ['components/scripts/script1.js','components/scripts/script2.js','components/scripts/script3.js'];
sassSources = ['components/sass/style.scss'];
htmlSources = [outputDir + '/*.html'];

gulp.task('log', function() {
	gutil.log("Workflow generate: START");
});

gulp.task('notify-updates', function() {
	console.log('assets updated');
});

gulp.task('js', function() {
	gulp.src(jsSources)
		.pipe(gconcat('script.js'))
		.pipe(browserify())
		.pipe(gulp.dest(outputDir + '/js'))
		.pipe(connect.reload());
});

gulp.task('sass', function() {
	gulp.src(sassSources)
		.pipe(compass({
			sass: 'components/sass',
			image: 'builds/development/images',
			style: sassStyle
		}))
		.on('error', gutil.log)
		.pipe(gulp.dest(outputDir + '/css'))
		.pipe(connect.reload());
});

gulp.task('html', function() {
	gulp.src('builds/development/*.html')
		.pipe(gulpif(env === "production", htmlmin({collapseWhitespace: true})))
		.pipe(gulpif(env === "production", gulp.dest(outputDir)))
		.pipe(connect.reload());
});

gulp.task('connect', function() {
	connect.server({
		root: outputDir,
		livereload: true
	});
});

gulp.task('watch', function() {
	gulp.watch(jsSources, ['js', 'notify-updates']);
	gulp.watch(sassSources, ['sass', 'notify-updates']);
	gulp.watch('components/sass/partials/*.scss', ['sass', 'notify-updates']);
	gulp.watch('builds/development/*.html', ['html',  'notify-updates']);
});

gulp.task('default', ['log', 'js', 'sass', 'html', 'connect', 'watch']);