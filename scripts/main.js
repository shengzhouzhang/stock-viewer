
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

  stocks.sort(function(a, b) {
    return a.name < b.name ? -1 : 1;
  });

  stocks.forEach(function(stock){
    fetchTemplate('stock', function(template) {
      container.append(_.template(template,{stock: stock}));
    })
  })

});



