/**
 * Created by zhang on 1/04/2014.
 */

sv.dal.Stock = function(raw) {
  var fields = this.getFields_(raw);

  this.name = this.parseName_(fields.name);
  this.price = parseFloat(fields.price);
  this.time = new Date(fields.utctime);
  this.volume = parseInt(fields.volume);
};

sv.dal.Stock.prototype.parseName_ = function(name) {
  return name.split('/').join(' / ');
};

sv.dal.Stock.prototype.getFields_ = function(raw) {
  assDefinedAndNotNull(raw);
  assDefinedAndNotNull(raw.resource);
  assDefinedAndNotNull(raw.resource.fields);
  assDefinedAndNotNull(raw.resource.fields.name);
  assValidNumber(raw.resource.fields.price);
  assDateTime(raw.resource.fields.utctime);
  assValidNumber(raw.resource.fields.volume);

  return raw.resource.fields;
};