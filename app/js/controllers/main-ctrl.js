'use strict';

module.exports = function($rootScope, $scope,
      ModalsService) {


  $scope.$on('showLogoutModal', function() {
    ModalsService.logOutConfirm();
  });


};
