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

    storage: __dirname + '/db_file/db.sqlite'
});

/**
 * @typedef {Object} DB_User
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} email
 * @property {string} trade_link
 * @property {string} password
 * @property {string} login
 * @property {Date} last_login
 *
 */
/**
 *
 * @type {Model}
 */
var User = db.define('user',
    {
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        login: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        trade_link: {
            type: Sequelize.STRING
        },
        last_login: {
            type: Sequelize.DATE,
            defaultValue: function(){return new Date();}
        }



    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });


/**
 * @typedef {Object} DB_Competition
 * @property {string} name
 * @property {string} description
 */
var Competition = db.define('competition',
    {
        name: {
            type: Sequelize.STRING
        },
        description: {
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

Competition.belongsTo(User, {
    as: 'owner',
    foreignKey: 'owner_id'
});

User.hasMany(Competition, {
    as: 'organizes',
    foreignKey: 'owner_id'
});

// =====================================================================================================================


exports.db = db;
exports.User = User;
exports.Competition = Competition;
