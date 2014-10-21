'use strict';

var gulp        = require('gulp')
,   runSequence = require('run-sequence')
,   browserSync = require('browser-sync');

var path = require('../utils/paths');

function browserSyncInit() {
  return browserSync.init({
    server: {
      baseDir: path.dist.path,
      directory: false
    },
    startPath: '/views/',
    notify: false,
    browser: 'google chrome canary'
  });
}

gulp.task('serve', function() {
  runSequence('default', function () {

    browserSyncInit();

    gulp.watch([path.src.html + '**/*.jade'], ['html']);
    gulp.watch([path.src.css + '**/*.*'], ['css']);
    gulp.watch([path.src.js + '**/*'], ['js']);
    gulp.watch([path.src.img + '**/*'], ['img']);
    gulp.watch([path.src.data + '**/*'], ['data']);

  });
});
