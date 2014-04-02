var https = require('https'),
    sqlite3 = require('sqlite3').verbose();

var options = {
  host: 'finance.yahoo.com',
  port: 443,
  path: '/webservice/v1/symbols/allcurrencies/quote?format=json',
  method: 'GET'
};

console.log('Start');

var db = new sqlite3.Database('Stocks.db');

var request_ = function() {

  https.request(options, function(res) {

    var json = '';

    res.on('data', function(chunk) {
      json += chunk;
    });

    res.on('end', function() {

      var stmt = db.prepare("INSERT INTO Stocks VALUES (?, ?, ? ,? ,?, ?)");

      JSON.parse(json).list.resources.forEach(function(item) {

        var fields = item.resource.fields;
        stmt.run(fields.name, fields.symbol, fields.price, fields.type, fields.utctime, fields.volume);
      });

      stmt.finalize();

      db.get("SELECT COUNT(*) AS COUNT FROM Stocks", function(err, result) {
        console.log('Database: ' + result.COUNT);
      });

    });
  }).end();
};

var run_ = function(callback) {

  var interval = 5 * 60 * 1000,
      startHour = 10,
      endHour = 16;

  var save_ = function() {

    var now_ = new Date();

    console.log('log: ' + now_.toString())

    if (now_.getHours() > endHour) {
      console.log('Finished at ' + now_.toString());
      clearInterval(this);
      callback();
      return;
    }

    if (now_.getHours() > startHour) {
      request_();
    } else {
      console.log('Have not started yet');
    }
  }

  save_();

  setInterval(save_, interval);
}
db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS Stocks (name TEXT, symbol TEXT, price TEXT, type TEXT, time TEXT, volume TEXT)");

  db.get("SELECT COUNT(*) AS COUNT FROM Stocks", function(err, result) {
    console.log('Database: ' + result.COUNT);
  });

  run_(function() {
    db.close();
    console.log('Database is Closed.');
  });

});
