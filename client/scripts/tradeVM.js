/**
 * Created by zhang on 6/04/2014.
 */

define(['template', 'underscore', 'util'], function(templates, _, util){
  'use strict';

  function TradeVM() {

    this.container_ = $('div.additional-page');
    this.init_();
  };

  TradeVM.TEMPLATE = 'client/templates/trade.html';

  TradeVM.prototype.init_ = function(type) {
    var vm = this;

    templates.fetchTemplate(TradeVM.TEMPLATE, function(tmp) {

      var template = tmp({trade: {
        type: type
      }});

      vm.container_.html(template);

      var tradePriceEl = $('input.trade-price'),
          tradeVolumeEl = $('input.trade-volume');

      $('button.trade-action').click(function(){

        if(util.isFunction(vm.action)) {
          vm.action(
              parseFloat(tradePriceEl.val()),
              parseFloat(tradeVolumeEl.val())
          );
          $('#stock-trade-modal').modal('hide');
          vm.action = undefined;
        }
      });
    });
  };

  TradeVM.prototype.action = undefined;

  TradeVM.prototype.initView = function(type, model, action) {
    this.container_.find('h4').html(type);
    this.container_.find('label.stock-name').html(model.name);
    this.container_.find('label.stock-symbol').html(model.symbol);
    this.container_.find('label.stock-volume').html(model.volume);
    this.container_.find('label.hold-volume').html(model.hold);
    this.container_.find('label.stock-price').html(model.price);
    this.container_.find('button.trade-action').html(action);
  };

  TradeVM.prototype.loadView = function(type, model, action) {
    this.container_.find('h4').html(type);
    this.container_.find('label.stock-name').html(model.name);
    this.container_.find('label.stock-symbol').html(model.symbol);
    this.container_.find('label.stock-volume').html(model.volume);
    this.container_.find('label.hold-volume').html(model.hold);
    this.container_.find('label.stock-price').html(model.price);
    this.container_.find('button.trade-action').html(action);
  };

  return new TradeVM();
});