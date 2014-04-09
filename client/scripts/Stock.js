/**
 * Created by zhang on 6/04/2014.
 */

define(['assert'], function(assert){
  'use strict';

  function stock(name, symbol, price, type, time, volume, ts) {

    /** @public */
    this.name = name;
    this.symbol = symbol;
    this.price = price;
    this.type = type;
    this.time = time;
    this.volume = volume;
    this.ts = ts;
    this.hold = 0;
  };

  return stock;
});
