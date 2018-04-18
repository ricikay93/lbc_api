var Sequelize = require('sequelize');
var config = require('../config/config');
var referenceModels = require('../models/references');
var churchCircuit = require('../models/circuitChurch');

let sequelize = config.sequelize;
let Church = churchCircuit.church;

var Member = sequelize.define('member', {
    title: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING,
    },
    firstName: {
        type: Sequelize.STRING,
    },
    middleName: {
        type: Sequelize.STRING,
    },
    memberPic: {
        type: Sequelize.BLOB,
        allowNull: true
    },
    is_male: {
        type: Sequelize.BOOLEAN,
        default: true
    },
    birthday: {
        type: Sequelize.DATEONLY
    },
    memberStatus: {
        type: Sequelize.ENUM('Single', 'Married', 'Divourced'),
        default: 'Single'
    },
    street: {
        type: Sequelize.STRING
    },
    town: {
        type: Sequelize.STRING
    }
});


var MemberEmergencyContact = sequelize.define('emergencyContacts', {
    emergencyContactName: {
        type: Sequelize.STRING
    },
    emergencyContactRelationship: {
        type: Sequelize.STRING
    },
    emergencyContactTelephone: {
        type: Sequelize.STRING
    }
});


var MemberContact = sequelize.define('memberContact', {
    memberContact: {
        type: Sequelize.TEXT,
        unique: true
    }
});

var MemberSchooling = sequelize.define('memberSchooling', {
    school: {
        type: Sequelize.STRING
    },
    years: {
        type: Sequelize.STRING
    },
    qualification: {
        type: Sequelize.TEXT
    }
});

Member.belongsTo(Church);
MemberContact.belongsTo(Member);
MemberSchooling.belongsTo(Member);
MemberEmergencyContact.belongsTo(Member);

Church.hasMany(Member, { foreignKey: 'churchID', as: 'members', onDelete: 'CASCADE' });
Member.hasMany(MemberContact, { foreignKey: 'memberID', as: 'contacts', onDelete: 'CASCADE' });
Member.hasMany(MemberSchooling, { foreignKey: 'memberID', as: 'schooling', onDelete: 'CASCADE' });
Member.hasMany(MemberEmergencyContact, { foreignKey: 'memberID', as: 'emergencyContacts', onDelete: 'CASCADE' });


module.exports = {
    Member: Member,
    MemberContact: MemberContact,
    MemberSchooling: MemberSchooling,
    MemberEmergencyContact: MemberEmergencyContact
};