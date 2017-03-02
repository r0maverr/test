var mysql = require('mysql');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('db', 'root', 'pass', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: true
    // storage: 'path/to/database.sqlite'
});

var employee = sequelize.define('employee',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            // validate: { notEmpty: true }
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            // validate: { notEmpty: true }
        },
        departmentId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            // validate: { notEmpty: true }
        }
    }
);

employee.sync().then(function() {
    console.log('Table employee is sync!');
}).catch(function(err) {
    console.log('Database error: ' + err);
});

module.exports  = employee;