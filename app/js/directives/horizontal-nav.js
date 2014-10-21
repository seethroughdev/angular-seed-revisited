'use strict';

module.exports = function() {

  return {
    restrict: 'E',
    replace: true,
    scope: {
      slug: '@',
      subs: '='
    },
    template: require('../partials/directives/horizontal-nav.jade'),
    link: function() {
    }

  };
};
