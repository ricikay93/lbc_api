var Sequelize = require('sequelize');
var config = require('../config/config');
var referenceModels = require('../models/references');

let sequelize = config.sequelize;
let Parish = referenceModels.Parish;


var Circuit = sequelize.define('circuit', {
    circuit: { type: Sequelize.STRING, unique: true }
});

Circuit.belongsTo(Parish);
Parish.hasMany(Circuit, { foreignKey: 'parishCode' });

var Church = sequelize.define('circuitChurch', {
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
    }
});

Church.belongsTo(Circuit);
Circuit.hasMany(Church, { foreignKey: 'parish', as: 'parishes', onDelete: 'CASCADE' });

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

var ChurchVisited = sequelize.define('churchVisited', {
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

ChurchContact.belongsTo(Church);
ChurchMission.belongsTo(Church);
ChurchVisited.belongsTo(Visitor);
ChurchVisited.belongsTo(Church);

Church.hasMany(ChurchContact, { foreignKey: 'churchID', as: 'contacts', onDelete: 'CASCADE' });
Church.hasMany(ChurchMission, { foreignKey: 'churchID', as: 'missions', onDelete: 'CASCADE' });
Church.hasMany(ChurchVisited, { foreignKey: 'churchID', as: 'churchVisited', onDelete: 'CASCADE' });
Visitor.hasMany(ChurchVisited, { foreignKey: 'visitorID', as: 'visitorInfo', onDelete: 'CASCADE' });


module.exports = {
    circuit: Circuit,
    church: CircuitChurch,
    churchContact: ChurchContact,
    churchMission: ChurchMission,
    visitor: Visitor,
    churchVisited: ChurchVisited
}