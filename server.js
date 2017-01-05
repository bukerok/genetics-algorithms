var connect = require('connect'),
  serveStatic = require('serve-static'),
  path = require('path'),
  reader = require('./visualization/reader'),
  app = connect();

app.use(serveStatic(__dirname)).
  use('/', serveStatic(__dirname + '/index.html')).
  use('/scripts', serveStatic(__dirname + '/node_modules/')).
  use('/data', (req, res) => res.end(JSON.stringify(reader.getData()))).
  listen(8080, () => console.log('Server running on 8080...'));
