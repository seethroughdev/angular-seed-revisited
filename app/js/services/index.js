'use strict';

module.exports = function(app) {
  app
    .service('ModalsService', require('./ui/modals-svc'))
    .service('StorageUtil', require('../util/storage-util'));
};
