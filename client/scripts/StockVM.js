/**
 * Created by zhang on 6/04/2014.
 */

define(['assert', 'template', 'underscore', 'util', 'tradeVM', 'account'],
    function(assert, templates, _, util, modal, account){
  'use strict';

  function StockVM(stock, parent) {

    this.model = stock;
    this.container_ = parent;

    this.defineElements_();
    this.defineStyles_();
    this.initView_();
  };

  /** @static */
  StockVM.TEMPLATE = 'client/templates/summary.html';

  /** @private */
  StockVM.prototype.defineElements_ = function() {
    this.viewId_ = this.populateViewId();
    this.elementId_ = ['#', this.viewId_].join('');
    this.priceElementId_ = ['#', this.viewId_, ' div.stock-price > span'].join('');
    this.volumeElementId_ = ['#', this.viewId_, ' div.stock-volume > span'].join('');
    this.timeElementId_ = ['#', this.viewId_, ' div.stock-time'].join('');
    this.sellElementId_ = ['#', this.viewId_, ' a.stock-sell'].join('');
    this.buyElementId_ = ['#', this.viewId_, ' a.stock-buy'].join('');
  };

  StockVM.prototype.addEventListeners_ = function() {

    var vm = this;

    //console.log(this.sellElementId_);
    $(this.sellElementId_).click(function(){
      modal.loadView('Sell Stock', vm.model, 'Buy');
      modal.action = function(price, volume) {
        account.buy(this.model.symbol, price, volume);
      }
    });
    $(this.buyElementId_).click(function(){
      modal.loadView('Buy Stock', vm.model, 'Sell');
      modal.action = function(price, volume) {
        account.sell(this.model.symbol, price, volume);
      }
    });
  }

  /** @private */
  StockVM.prototype.defineStyles_ = function() {
    this.priceClass_ = 'price-normal';
    this.volumeClass_ = 'volume-normal';
  };

  StockVM.prototype.populateViewId = function() {
    return 'stock_summary_' + this.model.symbol.toLowerCase().replace('=', '_');
  };

  /** @private @param {!Element} container the parent container */
  StockVM.prototype.initView_ = function() {
    var vm = this;

    templates.fetchTemplate(StockVM.TEMPLATE, function(tmp) {

      var template = tmp({stock: {
        id: vm.viewId_,
        name: vm.model.name,
        symbol: vm.model.symbol,
        type: vm.model.type,
        price: vm.model.price,
        volume: vm.model.volume,
        time: util.formatDate(vm.model.time)
      }});

      vm.container_.append(template);
      vm.addEventListeners_();
    });
  };

  /** @private */
  StockVM.prototype.updateModel = function(price, volume, time, ts) {

    this.updateStyles_(price, volume);
    this.model.price = price;
    this.model.volume = volume;
    this.model.time = time;
    this.model.ts = ts;
    this.refreshView_();
  };

  /** @private */
  StockVM.prototype.updateStyles_ = function(price, volume) {

    if (this.model.price > price) {
      this.priceClass_ = 'price-down'
    } else if (this.model.price < price) {
      this.priceClass_ = 'price-up'
    } else {
      this.priceClass_ = 'price-normal'
    }

    if (this.model.volume > volume) {
      this.volumeClass_ = 'volume-down'
    } else if (this.model.volume < volume) {
      this.volumeClass_ = 'volume-up'
    } else {
      this.volumeClass_ = 'volume-normal'
    }
  };

  /** @private */
  StockVM.prototype.refreshView_ = function() {
    $(this.priceElementId_).removeClass().addClass(this.priceClass_).html(this.model.price);
    $(this.volumeElementId_).removeClass().addClass(this.volumeClass_).html(this.model.volume);
    $(this.timeElementId_).html(util.formatDate(this.model.time));
  };

  /** @public */
  StockVM.prototype.hide = function() {
    $(this.elementId_).hide();
  };

  /** @hide */
  StockVM.prototype.show = function() {
    $(this.elementId_).show();
  };

  return StockVM;
});