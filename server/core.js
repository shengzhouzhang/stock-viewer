/**
 * Created by zhang on 7/04/2014.
 */

define(function(require, exports, module) {
  'use strict';

  var modules = require('./configs.js').info.modules,
      db = require(modules.database),
      remote = require(modules.remote),
      io = require(modules.socket),
      events = require(modules.configs).info.events,
      options = require(modules.configs).info.server,
      messages = {
        connected: 'Socket has connected.',
        closed: 'Socket has closed.',
        start: 'Server has started at localhost:%d.'
      },
      interval;

  var sendInterval = function(socket) {

    var send = function() {

      db.select(function(stocks){
        //
        console.log('data sent.');
        socket.emit(events.sockets.push, JSON.stringify(stocks));
      });
    };

    interval = setInterval(send, options.interval);

    send();
  };

  var requestInterval = function() {

    setInterval(function() {

      // request stocks data from remote server
      remote.request(function(stocks) {
        db.save(stocks);
      });
    }, options.interval);
  };

  exports.start = function(server) {

    var web = io.listen(server);
    web.set('log level', 1);

    requestInterval();

    db.connect(function() {

      web.sockets.on(events.sockets.connection, function (socket) {
        console.log(messages.connected);

        sendInterval(socket);

        socket.on(events.sockets.disconnect, function () {
          console.log(messages.closed);
          clearInterval(interval);
        });
      });
    });
  };
});