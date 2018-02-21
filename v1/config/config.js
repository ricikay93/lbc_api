var Sequelize = require('sequelize'),
    server_config = require('./config-var');

var sequelize = new Sequelize('null', 'null', 'null', server_config.development);


module.exports = {
    sequelize: sequelize
};