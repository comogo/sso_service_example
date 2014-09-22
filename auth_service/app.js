var express    = require('express');
var bodyParser = require('body-parser');
var path       = require('path');
var logger     = require('morgan');
var Auth       = require('./auth');

app = express();
auth = new Auth('mysecret', '123456');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));

app.get('/', function(req, res) {
  res.render('index', {
    username: ''
  });
});

app.post('/signup', function(req, res) {
  console.log(req.params);

  res.end();
});

app.post('/login', function(req, res) {
  var user = auth.check(req.body.username, req.body.password);

  if (user) {
    res.send(auth.generateToken(user));
  } else {
    res.render('index', req.body);
  }
});

app.listen(3000);
