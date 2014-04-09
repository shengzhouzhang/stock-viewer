/**
 * Created by zhang on 6/04/2014.
 */


define(['assert', 'template', 'underscore', 'util', 'storage', 'stock'],
    function(assert, templates, _, util, storage, Stock){

  'use strict';

  function Parser() {
  };

  /** @private */
  Parser.prototype.parseName_ = function(name) {
    return name.split('/').join(' / ');
  };

  /** @public @param {!Object} raw the raw data from server side */
  Parser.prototype.parseRaw = function(raw) {

    var data = JSON.parse(raw),
        i,
        parsed = {},
        stock;

    for (i = 0; i < data.length; i++) {
      stock = this.parseRawImp_(data[i]);
      parsed[stock.symbol] = stock;
    }

    return parsed;
  };

  /** @private @param {!Object} raw the raw data from server side */
  Parser.prototype.parseRawImp_ = function(raw) {
    this.assertRaw_(raw);

    var name = this.parseName_(raw.name),
        symbol = raw.symbol,
        price = parseFloat(raw.price),
        type = raw.type,
        time = new Date(raw.time),
        volume = parseInt(raw.volume),
        ts = parseInt(raw.ts);

    // make the price fluctuated
    price = this.adjustPrice_(price);

    return new Stock(name, symbol, price, type, time, volume, ts);
  };

  /** @private @param {!Object} raw the raw data from server side */
  Parser.prototype.assertRaw_ = function(raw) {
    assert.assDefinedAndNotNull(raw);
    assert.assDefinedAndNotNull(raw.name);
    assert.assValidNumber(raw.price);
    assert.assDateTime(raw.time);
    assert.assValidNumber(raw.volume);
    assert.assValidNumber(raw.ts);
  };

  /** @private */
  Parser.prototype.adjustPrice_ = function(price) {
    return (price * (1 + (Math.random() * 0.1) * (Math.random() < 0.5 ? -1 : 1))).toFixed(3);
  };

  return Parser;
});