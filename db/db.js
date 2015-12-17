/**
 * Created by michal on 17.12.2015.
 */

var Sequelize = require('sequelize');


var db = new Sequelize('db', 'user', 'pass_to_db', {
    //host: 'localhost',
    dialect: 'sqlite',
    //pool: {
    //    max: 5,
    //    min: 0,
    //    idle: 10000
    //},

    storage: './db_file/db.sqlite'
});




/**
 * @typedef {Object} DB_User
 * @property {string} first_name
 * @property {string} last_name
 */
var User = db.define('user',
    {
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });

/**
 * @typedef {Object} DB_Competition
 * @property {string} name
 */
var Competition = db.define('competition',
    {
        name: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });

// =====================================================================================================================

User.belongsToMany(Competition, {
    through: {
        model: 'user_to_member',
        unique: false
    },
    foreignKey: 'user_id'
});
Competition.belongsToMany(User, {
    as: 'members',
    through: {
        model: 'user_to_member',
        unique: false
    },
    foreignKey: 'competition_id'
});

// =====================================================================================================================


exports.db = db;
exports.User = User;
exports.Competition = Competition;
