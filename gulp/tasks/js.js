'use strict';

var gulp        = require('gulp')
,   $           = require('gulp-load-plugins')()
,   runSequence = require('run-sequence')
,   browserSync = require('browser-sync')
,   reload      = browserSync.reload
,   browserify = require('browserify')
,   source     = require('vinyl-source-stream');

var path         = require('../utils/paths')
,   handleErrors = require('../utils/handleErrors');


// Options
var browserifyOpts = {
  debug: true,
  standalone: 'shared'
};

gulp.task('js:browserify', function () {
  return browserify( './' + path.src.js + 'index.js', browserifyOpts ).bundle()
    .on('error', handleErrors)
    .pipe(source( './' + path.src.js + 'index.js' ))
    .pipe($.changed(path.dist.js))
    .pipe($.streamify($.ngAnnotate()))
    .pipe($.rename('bundle.js'))
    .pipe(gulp.dest(path.dist.js))
    .pipe($.rename('bundle.min.js'))
    .pipe($.streamify($.uglify()))
    .on('error', handleErrors)
    .pipe(gulp.dest(path.dist.js));
});

gulp.task('js:vendor', function() {
  return gulp.src([path.bower.path + 'jquery/dist/jquery.js',
    path.src.js + 'vendor/**/*.js',
    '!' + path.src.js + 'vendor/modernizr.js',
    path.bower.path + 'angular/angular.js',
    path.bower.path + 'ui-router/release/angular-ui-router.js',
    path.bower.path + 'ngstorage/ngStorage.js',
    path.bower.path + 'ngDialog/js/ngDialog.js',
    path.bower.path + 'angular-loading-bar/build/loading-bar.js'
    ])
    .on('error', handleErrors)
    // .pipe($.newer(path.dist.js + 'vendor.js'))
    .pipe($.concatSourcemap('vendor.js'))
    .pipe($.size({ showFiles: true, title: 'compressed vendor:' }))
    .pipe(gulp.dest(path.dist.js));
});

gulp.task('js:modernizr', function() {
  return gulp.src(path.bower.path + 'modernizr/modernizr.js')
    .on('error', handleErrors)
    .pipe($.newer(path.dist.js + 'modernizr.js'))
    .pipe($.uglify())
    .pipe($.size({ showFiles: true, title: 'compressed modernizr:' }))
    .pipe(gulp.dest(path.dist.js));
});

gulp.task('js:hint', function () {
  return gulp.src([path.src.js + '**/*.js', '!' + path.src.js + 'vendor/**/*.js'])
    .pipe($.eslint())
    .on('error', handleErrors)
    .pipe($.eslint.format())
    .pipe(reload({stream: true}));
});

gulp.task('js', function() {
  runSequence('js:browserify', 'js:vendor', 'js:modernizr', 'js:hint');
});

