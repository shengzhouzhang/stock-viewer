

define(function(require, exports, module) {
  'use strict';

  var modules = require('./configs.js').info.modules,
      http = require(modules.http),
      util = require(modules.util),
      assert = require(modules.base),
      Stock = require(modules.stock).stock,
      options = require(modules.configs).info.remote,
      events = require(modules.configs).info.events,
      messages = {
        request: 'Receive data at %s',
        time: 'h:mm tt'
      };

  exports.request = function(callback) {
    assert.assFunction(callback);

    http.get(options, function(res) {

      var raw = [];

      res.on('data', function(chunk) {
        raw.push(chunk);
      });

      res.on('end', function() {
        console.log(util.format(messages.request, new Date().toString()));
        callback(parse(raw.join('')));
      });

    }).on("error", function(e){
      console.log("Got error: " + e.message);
    }).end();
  };


  var parse = function (raw) {
    var parsed = JSON.parse(raw),
        stocks = [],
        resources;

    assert.assDefinedAndNotNull(parsed);
    assert.assDefinedAndNotNull(parsed.list);
    assert.assDefinedAndNotNull(parsed.list.resources);

    resources = parsed.list.resources;

    resources.forEach(function(item) {
      assert.assDefinedAndNotNull(item);
      assert.assDefinedAndNotNull(item.resource);
      assert.assDefinedAndNotNull(item.resource.fields);

      var fields = item.resource.fields;

      stocks.push(new Stock(
          fields.name, fields.symbol, fields.price, fields.type, fields.utctime, fields.volume, fields.ts));
    });

    return stocks;
  }
});
