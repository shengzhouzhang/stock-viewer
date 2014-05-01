

define(function(require, exports, module) {
  'use strict';

  var modules = require('./configs.js').info.modules,
      sqlite3 = require(modules.sqlite).verbose(),
      util = require(modules.util),
      dbName = require(modules.configs).info.database,
      assert = require(modules.base),
      statements = {
        create1:
            'CREATE TABLE IF NOT EXISTS stocks (name TEXT, symbol TEXT, price TEXT, type TEXT, time TEXT, volume TEXT, ts TEXT, timestamp INTEGER);',
        create2:
            'CREATE TABLE IF NOT EXISTS account (balance REAL, stocks TEXT, timestamp INTEGER);',
        create3:
            'INSERT INTO account VALUES (0, "{}", 0);',
        insert:
            'INSERT INTO stocks VALUES (?, ?, ? ,? ,?, ?, ?, ?);',
        clear:
            'DELETE FROM stocks;' +
            'DELETE FROM timestamps;',
        select:
            'SELECT * FROM stocks WHERE timestamp IN (SELECT timestamp FROM stocks ORDER BY rowid DESC LIMIT 1);',
        update_account: 'UPDATE account SET balance = ?, stocks = ?, timestamp = ?',
        select_account: 'SELECT * FROM account',
        count: 'SELECT COUNT(*) AS COUNT FROM stocks;'
      },
      messages = {
        saved: 'data saved.',
        count: '%d rows found.'
      };

  exports.connect = function (callback) {
    assert.assString(dbName);

    this.db = new sqlite3.Database(dbName);
    this.db.serialize(function () {
      this.run(statements.create1);
      this.run(statements.create2);
      this.run(statements.create3);

      if (assert.isFunction(callback)) {
        callback();
      }
    });
  };

  exports.save = function (stocks, callback) {
    assert.assArray(stocks);
    var stmt = this.db.prepare(statements.insert),
        timestamp = Date.now();

    stocks.forEach(function (item) {

      stmt.run(item.name, item.symbol, item.price, item.type, item.time, item.volume, item.ts, timestamp);
    });

    stmt.finalize();
    console.log(messages.saved);
    if (assert.isFunction(callback)) {
      callback();
    }
  };

  exports.close = function () {
    this.db.close();
  };

  exports.select = function (callback) {
    assert.assFunction(callback);

    this.db.all(statements.select, function (err, results) {
      callback(results);
    });
  };

  exports.updateAccount = function(account) {

    var stmt = this.db.prepare(statements.update_account);
    stmt.run(account.balance, account.stocks, account.timestamp);
    stmt.finalize();
  };

  exports.selectAccount = function(callback) {

    this.db.get(statements.select_account, function (err, result) {
      callback(result);
    });
  };

  exports.count = function () {
    this.db.get(statements.count, function (err, result) {
      console.log(util.format(messages.count, result.COUNT));
    });
  };

  exports.clear = function () {
    this.db.get(statements.clear, function (err, result) {
      //console.log(err, result);
    });
  };
});