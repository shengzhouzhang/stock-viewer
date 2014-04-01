/**
 * Created by zhang on 1/04/2014.
 */
function Data() {
}

//http://finance.yahoo.com/webservice/v1/symbols/allcurrencies/quote?format=json

Data.RequestStock = function(callback) {
  $.ajax({
    url:"data/stock.data.json",
    success:callback
  });
}