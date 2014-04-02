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

fetchAllTemplates = (function(name) {

  var templates = window.sv.templates;

  if (!window.sv.templates[name]) {
    $.ajax({
      url:'templates/' + name + '.html',
      success:function(data) {
        window.sv.templates[name] = data;
      }
    });
  }
})('stock');

fetchTemplate = function(name, callback) {

  var templates = window.sv.templates;

  if (!templates[name]) {
    $.ajax({
      url:'templates/' + name + '.html',
      success:function(data) {

        templates[name] = data;
        callback(data);
      }
    });
  } else {
    callback(templates[name]);
  }
};

formatDate = function(date) {
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}