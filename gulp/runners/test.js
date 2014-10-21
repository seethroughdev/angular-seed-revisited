'use strict';

var gulp        = require('gulp')
,   $           = require('gulp-load-plugins')();

var karma       = require('karma').server;

var path         = require('../utils/paths')
,   handleErrors = require('../utils/handleErrors');

var webdriverStandalone = require('gulp-protractor').webdriver_standalone;

var mochaOpts = {
  reporter: 'spec',
  globals: ['module']
};

var phantomOpts = {
  viewportSize: {
    width: 1,
    height: 1
  }
};

var protractorArgs = {
  configFile: 'protractor.config.js',
  args: ['--baseUrl', 'http://localhost:3000/views/'],
  debug: true
};

gulp.task('test:unit', function(done) {
  karma.start({
      configFile: __dirname + '../../../karma.conf.js'
    }, done);
});

gulp.task('test:e2e', function() {
  gulp.src(path.test.functional + '**/*.js')
    .pipe($.protractor.protractor(protractorArgs))
    .on('error', handleErrors);
});

gulp.task('test:drive', webdriverStandalone);

gulp.task('test', ['test:unit']);
