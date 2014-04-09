/**
 * Created by zhang on 5/04/2014.
 */

define([''], function() {
  'use strict';

  var util = {};

  util.formatDate = function (date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' +
        date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  };

  util.isFunction = function (val) {
    return typeof(val) == 'function';
  };

  return util;
});