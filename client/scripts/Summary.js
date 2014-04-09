/**
 * Created by zhang on 1/04/2014.
 */

define(['assert', 'template', 'underscore', 'util', 'stockVM'],
    function(assert, templates, _, util, StockVM){
  'use strict';

  function Summary(parent) {

    this.container_ = parent;
    this.stockVMs_ = {};
  };

  Summary.prototype.reset = function() {
    this.stockVMs_ = {};
  };

  Summary.prototype.initOrUpdateViews = function(stocks) {

    var symbol, stock;

    for(symbol in stocks) {
      stock = stocks[symbol];

      // init views
      if (!this.stockVMs_[symbol]) {
        this.initView_(stock)
      } else {
        this.updateView_(stock)
      }
    }
  };

  Summary.prototype.initView_ = function(stock) {
    // init views
    this.stockVMs_[stock.symbol] = new StockVM(stock, this.container_);
  };

  Summary.prototype.updateView_ = function(stock) {
    // update views
    this.stockVMs_[stock.symbol].updateModel(stock.price, stock.volume, stock.time, stock.ts);
  };

  Summary.prototype.filter = function(value){

    var stocks = this.stockVMs_,
        value  = value.toUpperCase(),
        symbol,
        stock;

    for(symbol in stocks) {
      stock = stocks[symbol];
      if(stock.model.name.toUpperCase().indexOf(value) >= 0 ||
         stock.model.symbol.toUpperCase().indexOf(value) >= 0) {
        stock.show();
      } else {
        stock.hide();
      }
    }
  };


  return Summary;
});


