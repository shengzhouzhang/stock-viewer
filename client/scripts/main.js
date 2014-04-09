/**
 * Created by zhang on 5/04/2014.
 */

require(['jquery', 'underscore', 'socket', 'template', 'summary', 'parser', 'account', 'bootstrap'],
    function($, _, io, ns, Summary, Parser, Account) {
  'use strict';

  $(document).ready(function(){

    var socket = io.connect('http://localhost'),
        stocksContainer = $('div.stocks-container'),
        accountContainer = $('div.stock-account-page'),
        parser = new Parser(),
        summary = new Summary(stocksContainer),
        account = new Account(accountContainer),
        stocks;

    socket.on('stocks', function (raw) {

      console.log('received data');
      stocks = parser.parseRaw(raw);
      summary.initOrUpdateViews(stocks);
    });

    $('input.search-input').keyup(function(){
      if ( event.which == 13 ) {
        event.preventDefault();
      }
      summary.filter($(this).val());
    });


    $('a.stock-account').click(function() {
      account.show();
    });
  });
});





