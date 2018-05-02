var Sequelize = require('sequelize');
var config = require('../config/config');
var referenceModels = require('../models/references');

let sequelize = config.sequelize;
let Parish = referenceModels.Parish;


var Circuit = sequelize.define('circuit', {
    circuit: {
        type: Sequelize.STRING,
        unique: true
    },
    churchCount: {
        type: Sequelize.VIRTUAL(Sequelize.INTEGER, [
            [sequelize.literal('(SELECT COUNT(churches.id) FROM churches WHERE churches.circuitID = Circuit.id)'), 'churchCount']
        ])
    }
});

Circuit.belongsTo(Parish, {
    foreignKey: 'assocParish'
});
Parish.hasMany(Circuit, {
    foreignKey: 'assocParish',
    as: 'Circuits'
});

var Church = sequelize.define('church', {
    church: {
        type: Sequelize.STRING,
        unique: true
    },
    seat_quota: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    dateConst: {
        type: Sequelize.DATE
    },
    churchStreet: {
        type: Sequelize.STRING
    },
    churchTown: {
        type: Sequelize.STRING
    },
    // memberCount: {
    //     type: Sequelize.VIRTUAL(Sequelize.INTEGER, [
    //         [sequelize.literal('(SELECT COUNT(churches.id) FROM churches WHERE churches.circuitID = Circuit.id)'), 'churchCount']
    //     ])
    // }
});

Church.belongsTo(Circuit, {
    foreignKey: 'circuitID'
});
Circuit.hasMany(Church, {
    foreignKey: 'circuitID',
    as: 'Churches',
    onDelete: 'CASCADE'
});

var ChurchContact = sequelize.define('churchContact', {
    churchContact: {
        type: Sequelize.TEXT,
        unique: true
    }
});

var ChurchMission = sequelize.define('churchMission', {
    churchMission: {
        type: Sequelize.TEXT,
        unique: true
    }
});

var Visitor = sequelize.define('churchVisitor', {
    title: {
        type: Sequelize.STRING
    },
    fullName: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.TEXT
    },
    telephone: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    ageGroup: {
        type: Sequelize.ENUM('7-12', '13-18', '19-35', '36-59', '60+'),
    }

});

var ChurchVisited = sequelize.define('churchVisit', {
    guestOf: {
        type: Sequelize.STRING
    },
    reasonVisiting: {
        type: Sequelize.STRING
    },
    dateVisited: {
        type: Sequelize.DATEONLY
    }
});

ChurchContact.belongsTo(Church, {
    foreignKey: 'churchID'
});
ChurchMission.belongsTo(Church, {
    foreignKey: 'churchID'
});
ChurchVisited.belongsTo(Visitor, {
    foreignKey: 'visitorID'
});
ChurchVisited.belongsTo(Church, {
    foreignKey: 'churchID'
});
Church.hasMany(ChurchContact, {
    foreignKey: 'churchID',
    as: { singular: 'ChurchContact', plural: 'ChurchContacts' },
    onDelete: 'CASCADE'
});
Church.hasMany(ChurchMission, {
    foreignKey: 'churchID',
    as: { singular: 'ChurchMission', plural: 'ChurchMissions' },
    onDelete: 'CASCADE'
});
Church.hasMany(ChurchVisited, {
    foreignKey: 'churchID',
    as: { singular: 'VisitTime', plural: 'VisitTimes' },
    onDelete: 'CASCADE'
});
Visitor.hasMany(ChurchVisited, {
    foreignKey: 'visitorID',
    as: { singular: 'VisitInfo', plural: 'VisitInfos' },
    onDelete: 'CASCADE'
});


module.exports = {
    circuit: Circuit,
    church: Church,
    churchContact: ChurchContact,
    churchMission: ChurchMission,
    visitor: Visitor,
    churchVisited: ChurchVisited
}