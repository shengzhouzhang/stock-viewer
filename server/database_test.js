

require("amd-loader");

var modules = require('./configs.js').info.modules,
    database = require(modules.database),
    Stock = require(modules.stock).stock;

database.connect(function(){

  // test count
  database.count();

  var data = [];
  data.push(new Stock('name1', 'symbol1', 'price1', 'type1', 'time1', 'volume1', 'ts1'));

  database.save(data, function(){
    database.select();

    database.count();
    database.select();

    database.clear();

    database.count();
  });

});
