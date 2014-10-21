'use strict';

var angular = window.angular;


/*==========  INSTANTIATE APP  ==========*/

var app = angular.module('mainApp', [
                                      'ui.router',
                                      'ngDialog',
                                      'ngStorage',
                                      'angular-loading-bar'
                                    ])

  .constant( 'STATE', {
    'MAIN': 'main'
  })

  .config(require('./routes'));


/*==========  Add Services  ==========*/

require('./services')(app);


/*==========  Add Controllers  ==========*/

require('./controllers')(app);

/*==========  Add Directives  ==========*/

require('./directives')(app);


module.exports = app;
