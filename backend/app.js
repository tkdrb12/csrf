var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');

var authRouter = require('./routes/auth');
var csrfRouter = require('./routes/csrf');
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');

var app = express();

let corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cookieParser());
app.use(bodyParser.text());

app.use(
  session({
    resave: true,
    secret: 'secret',
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
      originalMaxAge: 1000 * 60 * 10,
    },
    name: 'csrf-test',
  })
);

app.use(cors(corsOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/csrf', csrfRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
