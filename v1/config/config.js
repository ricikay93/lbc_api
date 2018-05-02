var Sequelize = require('sequelize');
//server_config = require('./config-var');
var foo = require('../resources/config.json');

console.log(process.env.NODE_ENV);
console.log(JSON.stringify(foo[process.env.NODE_ENV]))

foo[process.env.NODE_ENV]

var sequelize = new Sequelize('null', 'null', 'null', foo[process.env.NODE_ENV]);


module.exports = {
    sequelize: sequelize
};