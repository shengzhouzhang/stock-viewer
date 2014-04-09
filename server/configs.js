

exports.info = {
  database: 'database/stocks.db',
  server: {
    port: 8000,
    interval: 30000,
    public: ['client'],
    index: '/client/index.html'
  },
  remote: {
    host: 'finance.yahoo.com',
    path: '/webservice/v1/symbols/allcurrencies/quote?format=json'
  },
  modules: {
    configs: __dirname + '/configs.js',
    core: __dirname + '/core.js',
    remote: __dirname + '/remote.js',
    database: __dirname + '/database.js',
    stock: __dirname + '/stock.js',
    base: __dirname + '/base.js',
    socket: 'socket.io',
    sqlite: 'sqlite3',
    express: 'express',
    https: 'https',
    http: 'http',
    util: 'util'
  },
  events: {
    sockets: {
      connection: 'connection',
      disconnect: 'disconnect',
      push: 'stocks'
    },
    request: {
      receive: 'data',
      finish: 'end'
    }
  }
};