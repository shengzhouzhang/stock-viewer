

require("amd-loader");

var modules = require('./configs.js').info.modules,
    remote = require(modules.remote);

remote.request(function(data){
  console.log(data);
});
