/**
 * Created by michal on 17.12.2015.
 */

var db = require('./db');
var Sequelize = require('sequelize');


db.User.findAll().then(function(o){console.log(o)});

db.User.create({
    first_name: 'Ok',
    last_name: 'Ok'
});