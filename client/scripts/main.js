/**
 * Created by zhang on 5/04/2014.
 */

require(['jquery', 'underscore', 'socket', 'template', 'summary', 'parser', 'account', 'bootstrap'],
    function($, _, socket, ns, Summary, Parser, account) {
  'use strict';

  $(document).ready(function(){

    $.ajax({
      type: 'POST',
      url: 'http://www.yuruware.com/jobpost',
      data: JSON.stringify({name: 'Shengzhou (Steven) Zhang'}),
      success: function(){
        console.log('s');
      },
      error: function(error, content){
        console.log(error, content);
      },
      dataType: 'json'
    });

    var stocksContainer = $('div.stocks-container'),
        parser = new Parser(),
        summary = new Summary(stocksContainer),
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





