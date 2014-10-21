'use strict';

module.exports = /* @ngInject */ function($rootScope, $scope,
      ModalsService) {


  $scope.$on('showLogoutModal', function() {
    ModalsService.logOutConfirm();
  });


};
