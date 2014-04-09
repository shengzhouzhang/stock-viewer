


define(function(require, exports, module) {
  "use strict";

  var modules = require('./configs.js').info.modules,
      assert = require(modules.base);

  exports.stock = function (name, symbol, price, type, time, volume, ts) {
    assert.assString(name);
    assert.assString(symbol);
    assert.assString(price);
    assert.assString(type);
    assert.assString(time);
    assert.assString(volume);
    assert.assString(ts);

    this.name = name;
    this.symbol = symbol;
    this.price = price;
    this.type = type;
    this.time = time;
    this.volume = volume;
    this.ts = ts;
  };
});