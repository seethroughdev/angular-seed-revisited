'use strict';

var gulp         = require('gulp')
,   $            = require('gulp-load-plugins')();

var path         = require('../utils/paths')
,   handleErrors = require('../utils/handleErrors');


gulp.task('data', function() {
  return gulp.src(path.src.data + '**/*.json')
    .on('error', handleErrors)
    .pipe($.changed(path.dist.data))
    .pipe(gulp.dest(path.dist.data));
});
