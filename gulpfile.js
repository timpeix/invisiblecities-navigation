var gulp = require('gulp');
var livereload = require('gulp-livereload');
var less = require('gulp-less');
var to5ify = require('6to5ify');
var browserify = require('browserify');
var watchify = require('gulp-watchify');
var autoprefixer = require('gulp-autoprefixer');
var reactify = require('reactify');
var server = require('gulp-server-livereload');

// Hack to enable configurable watchify watching
var watching = false;
gulp.task('enable-watch-mode', function () {
  watching = true;
});

// Browserify and copy js files
gulp.task('browserify', watchify(function (watchify) {
  return gulp.src('./src/index.js')
    .pipe(watchify({
      debug: true,
      watch: watching,
      setup: function (bundle) {
        bundle.transform(reactify);
        //bundle.transform(to5ify);
      }
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(livereload());
}));

gulp.task('watchify', ['enable-watch-mode', 'browserify']);

gulp.task('less', function () {
  gulp.src('./css/*.less')
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist'))
    .pipe(livereload());
});

 
gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(server({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});


gulp.task('html', function() {
  gulp.src('index.html').pipe(gulp.dest('./dist'));
});

// 
// gulp.task('watch', function () {
//   gulp.watch('public/css/*.less', ['less']);
// });
// 
// gulp.task('develop', function () {
//   livereload.listen();
//   nodemon({
//     script: 'bin/www',
//     ext: 'js jade json',
//     ignore: ['public/*', 'src/client/*']
//   }).on('restart', function () {
//     setTimeout(function () {
//       //livereload.changed();
//     }, 1500);
//   });
// });

gulp.task('default', [
  'less',
  'html',
  // 'develop',
  'watchify',
  'webserver'
  
  //'watch'
]);
