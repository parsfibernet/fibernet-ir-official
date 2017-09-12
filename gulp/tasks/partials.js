var browserSync   = require('browser-sync');
var config        = require('../util/loadConfig').partials;
var gulp          = require('gulp');

gulp.task('partials', function() {
  browserSync.notify(config.notification);
  return gulp.src(config.assets)
    .pipe(gulp.dest(config.dist));
});
