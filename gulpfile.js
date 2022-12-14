// Less configuration
var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('less', function(cb) {
  gulp
    .src('styles/less/elityaworld.less')
    .pipe(less())
    .pipe(gulp.dest("./styles"));
  cb();
});

gulp.task(
  'default',
  gulp.series('less', function(cb) {
    gulp.watch('styles/less/*.less', gulp.series('less'));
    cb();
  })
);