/**
 * Created by zhang on 1/04/2014.
 */

window.sv = {};

window.sv.dal = {};
window.sv.templates = {};

assertType = function(val, type) {
  if (typeof val !== type)
    throw 'Wrong Type';
}

assDefinedAndNotNull = function(val) {
  if (val === undefined || val === null)
    throw 'Missing Value';
}

assValidNumber = function(val) {
  if (isNaN(parseFloat(val)))
    throw 'Invalid Number';
}

assDateTime = function(val) {
  if (new Date(val) === 'Invalid Date')
    throw 'Invalid Date';
}

fetchTemplate = function(name, callback) {

  var templates = window.sv.templates;

  if (!window.sv.templates[name]) {
    $.ajax({
      url:'templates/' + name + '.html',
      success:function(data) {
        templates[name] = data;
        callback(templates[name]);;
      }
    });
  } else {
    callback(templates[name]);
  }

}