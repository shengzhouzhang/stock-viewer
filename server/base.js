

exports.assDefinedAndNotNull = function (val) {
  'use strict';

  if (val === undefined || val === null) {
    console.trace();
    throw 'Missing Value';
  }
};

var assType = function(val, type) {
  if (typeof val !== type) {
    console.trace();
    throw 'Type Error: ' + typeof val + ' expected to be ' + type + '!!!';
  }

};

exports.assArray = function(val) {
  Array.isArray(val);
};

exports.assString = function(val) {
  assType(val, 'string');
};

exports.assFunction = function(val) {
  assType(val, 'function');
};


exports.assInstance = function(val, type) {
  if (val instanceof type) {
    console.trace();
    throw 'Wrong Instance';
  }

};

exports.isFunction = function(val) {
  if (typeof val !== 'function') {
    return false;
  }

  return true;
};