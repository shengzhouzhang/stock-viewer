/**
 * Created by zhang on 5/04/2014.
 */


define(['assert', 'template', 'underscore', 'util'], function(assert, templates, _, util){
  'use strict';

  function Account(parent) {

    this.balance_ = 0;
    this.value_ = 0;
    this.container_ = parent;
    this.stocks_ = [];

    this.initView_();
  };

  /** @static */
  Account.TEMPLATE = 'client/templates/account.html';

  /** @private @param {!Element} container the parent container */
  Account.prototype.initView_ = function() {
    var vm = this;

    templates.fetchTemplate(Account.TEMPLATE, function(tmp) {

      var template = tmp({account: {
        balance: vm.balance_,
        value: vm.value_
      }});

      vm.container_.append(template);
      //vm.hide();
    });
  };

  Account.prototype.buy = function(symbol, volume, price) {

  };

  Account.prototype.sell = function(symbol, volume, price) {

  };

  Account.prototype.show = function() {
    $('#stock-account-view').show();
  };

  Account.prototype.hide = function() {
    $('#stock-account-view').hide();
  };

  Account.prototype.initDetailView = function(container) {

  };

  Account.prototype.buy = function(stock, price, volume) {

    this.stocks.push(stock);
  };

  Account.prototype.sell = function(stock, price, volume) {

  };


  return Account;
});
