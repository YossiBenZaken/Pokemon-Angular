var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const inGameRouter = require('./routes/ingame');
const pokemonRouter = require('./routes/pokemon');
const infoRouter = require('./routes/information');
const statsRouter = require('./routes/statistics');
const rankingRouter = require('./routes/ranking');
const accountOptionsRouter = require('./routes/account-options');
const marketRouter = require('./routes/market');

var app = express();
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/info', infoRouter);
app.use('/stats', statsRouter);
app.use('/ranking', rankingRouter);
app.use('/ingame', inGameRouter);
app.use('/pokemon', pokemonRouter);
app.use('/account-options', accountOptionsRouter);
app.use('/market', marketRouter);
app.use('', indexRouter);

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
  res.send(err);
});

module.exports = app;
