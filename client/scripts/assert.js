/**
 * Created by zhang on 1/04/2014.
 */

define([''], function() {
  'use strict';

  var assert = {};

  assert.assertType = function (val, type) {
    if (typeof val !== type) {
      throw 'Wrong Type';
    }
  };

  assert.assDefinedAndNotNull = function (val) {
    if (val === undefined || val === null) {
      throw 'Missing Value';
    }
  };

  assert.assValidNumber = function (val) {
    if (isNaN(parseFloat(val))) {
      throw 'Invalid Number';
    }
  };

  assert.assDateTime = function (val) {
    if (new Date(val) === 'Invalid Date') {
      throw 'Invalid Date';
    }
  };

  return assert;
});