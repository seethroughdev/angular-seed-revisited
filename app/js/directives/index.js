'use strict';

module.exports = function(app) {

  app
     .directive('filterList', require('./filter-list'))
     .directive('horizontalNav', require('./horizontal-nav'));
};
