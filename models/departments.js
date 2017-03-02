var mysql = require('mysql');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('db', 'root', 'pass', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: true
    // storage: 'path/to/database.sqlite'
});

sequelize.authenticate().then(function() {
    console.log('Connect to DB created!');
}).catch(function(err) {
    console.log('Connection error: ' + err);
});

var departments = sequelize.define('departments', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type:Sequelize.STRING,
        allowNull: false,
        validate: {
            // notEmpty: true
        }
    },
    description: {
        type:Sequelize.STRING,
        allowNull: false,
        validate: {
            // notEmpty: true
        }
    }
});

departments.sync().then(function() {
    console.log('Table departments is sync!');
}).catch(function(err) {
    console.log('Database error: ' + err);
});

module.exports  = departments;