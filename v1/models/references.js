var Sequelize = require('sequelize'),
    config = require('../config/config');

let sequelize = config.sequelize;

var Parish = sequelize.define('parish', {
    code: { type: Sequelize.STRING(5), primaryKey: true },
    parish: { type: Sequelize.STRING, unique: true }
});

var ContactType = sequelize.define('contactType', {
    contactFilter: {
        type: Sequelize.ENUM('churchOnly', 'personOnly', 'all'),
    },
    contactType: {
        type: Sequelize.STRING,
        unique: true
    }
});

var Skill = sequelize.define('skill', {
    skill: {
        type: Sequelize.STRING,
        unique: true
    }
});

module.exports = {
    Parish: Parish,
    ContactType: ContactType,
    Skill: Skill
};