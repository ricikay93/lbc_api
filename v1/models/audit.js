var Sequelize = require('sequelize');
var config = require('../config/config');

let sequelize = config.sequelize;

var EventAudit = sequelize.define('eventAudit', {
    user: {
        type: Sequelize.STRING,
    },
    comments: {
        type: Sequelize.TEXT
    }
});

module.exports = {
    EventAudit: EventAudit
};