var connect = require('connect'),
  serveStatic = require('serve-static'),
  path = require("path"),
  app = connect();

app.use(serveStatic(__dirname)).listen(8080, function () {
  console.log('Server running on 8080...');
});
app.use('/scripts', serveStatic(__dirname + '/node_modules/'));
app.use('/', serveStatic(__dirname + '/index.html'));