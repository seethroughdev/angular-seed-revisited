'use strict';

describe('Colors', function () {

  var colors = require('../../../app/js/util/colors-util');

  it('should be loaded', function () {
    expect(colors).to.be.an('object');
  });

  it('should have a main array', function () {
    expect(colors.main).to.be.an('array');
  });

  it('should not be empty', function () {
    expect(colors.main).to.have.length.above(0);
  });

  it('should have a y2 value', function () {
    expect(colors.y2).to.exist;
  });

});
