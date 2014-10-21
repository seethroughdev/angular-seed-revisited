'use strict';

require('../../../app/js/');

describe('MainCtrl', function() {

  var scope;

  beforeEach(window.angular.mock.module('mainApp'));
  beforeEach(window.angular.mock.inject(
    function($controller, $rootScope) {

      scope = $rootScope.$new();
      $controller('MainCtrl',
        { $scope: scope });

  }));

  it('expectation', function () {
    expect(scope).to.be.ok;
  });

});
