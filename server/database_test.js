

require("amd-loader");

var modules = require('./configs.js').info.modules,
    database = require(modules.database),
    Stock = require(modules.stock).stock;

database.connect(function(){

  // test count
  database.count();

  database.selectAccount(function(data){
    console.log(data);
  });
  var data = [];
  data.push(new Stock('name1', 'symbol1', 'price1', 'type1', 'time1', 'volume1', 'ts1'));

  database.save(data, function(){
    database.select(function(data){
      console.log(data);
    });

    database.count();

    database.select(function(data){
      console.log(data);
    });

    database.clear();

    database.count();
  });

});
