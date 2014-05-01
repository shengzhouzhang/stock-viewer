/**
 * Created by zhang on 5/04/2014.
 */


define(['assert', 'template', 'underscore', 'util', 'socket'],
    function(assert, templates, _, util, socket){
  'use strict';

  function Account(parent) {

    this.balance_ = 0;
    this.stocks_ = {};
    this.timestamp_ = 0;
    this.value_ = 0;
    this.container_ = parent;


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
      vm.addEventListeners_();

      socket.on('request-account', function (raw) {

        var data = (JSON.parse(raw));

        vm.balance_ = data.balance;
        vm.stocks_ = data.stocks;
        vm.timestamp_ = data.timestamp;
        vm.refresh_();
      });
      //vm.hide();
    });
  };

  Account.prototype.addEventListeners_ = function() {

    var vm = this;

    $('button.add-balance').click(function(){
      var amount = parseFloat($('#account-add-balance-button').val());
      vm.addBalance(amount);
      $('#add-balance-modal').modal('hide');
    });
  };

  Account.prototype.buy = function(symbol, price, volume) {

    if(this.balance_ >= volume * price) {

      if (!this.stocks_[symbol]) {
        this.stocks_[symbol] = volume;
      } else {
        this.stocks_[symbol] += volume;
      }

      this.balance_ -= volume * price;
      this.update_();
    }
  };

  Account.prototype.sell = function(symbol, price, volume) {

    if (!!this.stocks_[symbol] &&
        this.stocks_[symbol] >= volume) {

      this.stocks_[symbol] -= volume;

      if(!this.stocks_[symbol]) {
        delete this.stocks_[symbol];
      }

      this.balance_ += volume * price;
      this.update_();
    }
  };

  Account.prototype.addBalance = function(amount) {

    this.balance_ += amount;
    this.update_();
  };

  Account.prototype.update_ = function() {
    console.log({
      balance: this.balance_,
      stocks: this.stocks_,
      ts: (new Date()).getTime()
    });
    socket.emit('update-account', {
      balance: this.balance_,
      stocks: this.stocks_,
      ts: (new Date()).getTime()
    });
    this.refresh_();
  };

  Account.prototype.show = function() {
    $('#stock-account-view').show();
  };

  Account.prototype.hide = function() {
    $('#stock-account-view').hide();
  };

  Account.prototype.refresh_ = function() {
    $('span.account-balance').html(this.balance_);
    $('label.current-balance').html(this.balance_);
  };

  Account.prototype.initDetailView = function(container) {

  };


  return new Account($('div.stock-account-page'));
});
