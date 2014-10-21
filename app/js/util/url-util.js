'use strict';

var url = require('url');

var UrlUtil  = function() {
    var self = this;

    // checking to see if location.param was added/removed/changed
    self.urlParamChanged = function(param, current, prev) {
      if (url.parse(current.replace(/#/, ''), param).query[param] !==
        url.parse(prev.replace(/#/, ''), param).query[param]) {
        return true;
      } else {
        return false;
      }
    };

    return self;

};

module.exports = UrlUtil;



