var Sequelize = require('sequelize'),
    config = require('../config/config');

let sequelize = config.sequelize;


var User = sequelize.define('user', {});

var Menu = sequelize.define('menu', {});

var EventType = sequelize.define('eventType', {

});

var Permissions = sequelize.define('permissions', {});