/**
 * Created by michal on 18.12.2015.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport')

router.get('/', function(req, res, next) {
    var messages = req.flash('error');
    res.render('login', { messages: messages });
});

router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/login');
});

router.post('/',
    passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);



module.exports = router;
