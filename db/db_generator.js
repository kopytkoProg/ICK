/**
 * Created by michal on 17.12.2015.
 */
var db = require('./db');
var Sequelize = require('sequelize');


db.db.sync({force: true}).then(function () {

    /**
     * @type DB_Competition
     */
    var competition = {
        name: 'Konkurs wielki!',
    };

    return db.Competition.create(competition);
}).then(function (competition) {

    /** @type DB_User[] */
    var users = [
        {
            first_name: 'John',
            last_name: 'Hancock',
            trade_link: 'http://steamcommunity.com/sharedfiles/filedetails/?l=polish&id=354215515'
        },
        {
            first_name: 'Arnold',
            last_name: 'Glenn',
            trade_link: 'http://steamcommunity.com/sharedfiles/filedetails/?l=polish&id=354215515'
        },
        {first_name: 'Silas', last_name: 'Tylar'},
        {first_name: 'Bud', last_name: 'Ingram'},
        {first_name: 'Hudson', last_name: 'Abe'},
        {first_name: 'Vin', last_name: 'Vergil'}
    ];


    users.forEach(function (e, i) {
        e.email = e.first_name + '.' + e.last_name + '@mail.com';
        e.password = 'pass';
        e.login = 'user' + i;
    });


    var p = users.reduce(function (acc, e) {
        acc.push(
            db.User.create(e).then(function (user) {
                return user.setCompetitions(competition).return(e);
            })
        );
        return acc;
    }, []);

    return p;
}).spread(function () {
    console.log('Done');
});





