/**
 * Created by zhang on 5/04/2014.
 */
require.config({
  // Initialize the application with the main application file
  deps: ['main'],

  paths: {

    // Librarie
    jquery: '../libs/jquery-2.1.0.min',
    bootstrap: '../libs/bootstrap/js/bootstrap.min',
    underscore: '../libs/underscore.min',
    socket: '/socket.io/socket.io.js',
    template: '../libs/namespace',

    // modules
    assert: './assert',
    cache: './cache',
    util: './util',
    parser: './parse',
    tradeVM: './tradeVM',
    storage: './Storage',
    stock: './stock',
    summary: './summary',
    account: './account'
  }
});