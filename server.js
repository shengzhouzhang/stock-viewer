#!/usr/bin/env node
"use strict";

require("amd-loader");

var modules = require('./server/configs.js').info.modules,
    express = require(modules.express),
    app = express(),
    server = require(modules.http).createServer(app),
    util = require(modules.util),
    core = require(modules.core),
    options = require(modules.configs).info.server,
    events = require(modules.configs).info.events,
    messages = {
      start: 'Server has started at localhost:%d.'
    };


server.listen(options.port);


/**
 * set dir to public
 */
(function publicAccess (dirs) {

  dirs.forEach(function(dir) {
    app.use("/" + dir, express.static(__dirname + '/' + dir));
  });
})(options.public);


/**
 * start application
 */
app.get('/', function (req, res) {
  res.sendfile(__dirname + options.index);
});

/**
 * start socket to request remote data
 */
core.start(server);

console.log(util.format(messages.start, options.port));