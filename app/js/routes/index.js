'use strict';

module.exports = /* @ngInject */ function($stateProvider,
                          $urlRouterProvider,
                          $locationProvider,
                          STATE) {

  $urlRouterProvider.otherwise('/main');


  /*==========  LOAD ROUTES  ==========*/

  require('./main-routes')(
    $stateProvider,
    $urlRouterProvider,
    $locationProvider,
    STATE
  );

};
