
Data.RequestStock(function(raw){
  assDefinedAndNotNull(raw);
  assDefinedAndNotNull(raw.list);
  assDefinedAndNotNull(raw.list.resources);

  var resources = raw.list.resources,
      stocks = [],
      container = $('div.stocks-container');

  resources.forEach(function(resource) {
    stocks.push(new sv.dal.Stock(resource));
  });

  console.log(stocks);

  fetchTemplate('stock', function(template) {
    container.html(_.template(template,{stock: stocks[0]}));
  })
});



