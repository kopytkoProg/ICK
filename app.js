var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug')('ICK:app');
var cookieSession = require('cookie-session');
var flash = require('connect-flash');


var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var app = express();

var db = require('./db/db');

// view engine setup
app.set('views', path.join(__dirname, 'view_to_render'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//app.use(express.session({secret: 'iahbsdfoiuphqa'}));
app.use(cookieSession({
    name: 'session',
    keys: ['s1', 's2', 's3', 's4']
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    db.User.findById(user.id).then(
        /** @param {DB_User} user */
        function (user) {
            done(null, user);
        });
});


passport.use('local-signup', new LocalStrategy(
    {
        usernameField: 'login',
        passwordField: 'password'
    },
    function (login, password, done) {

        db.User.findOne({
            where: {
                login: login,
                password: password
            }
        }).then(function (user) {
            if (!user) {
                return done(null, false, {message: 'Incorrect login or password.'});
            }
            user.last_login = new Date();
            user.save();
            var u = {login: user.login, id: user.id};
            return done(null, u);
        });

    }
));


function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}
//======================================================================================================================


app.use('/login', require('./routes/login'));
app.use('/users', isLoggedIn, require('./routes/users'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(isLoggedIn, express.static(path.join(__dirname, 'views')));


//======================================================================================================================

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.send('ERR: ' + err.message);
        console.error(err.message);
    })
}

// production error handler
// no stacktraces leaked to user
//app.use(function (err, req, res, next) {
//    res.status(err.status || 500);
//    res.send('ERR: ' + err.message);
//    console.error(err.message);
//});


module.exports = app;
