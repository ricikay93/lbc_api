process.env.NODE_ENV = 'production';
var config = require('./v1/config/config');

// models
var circuitAndChurch = require('./v1/models/circuitChurch');
// var member = require('./v1/models/member');
var references = require('./v1/models/references');

let sequelize = config.sequelize;

let Parish = references.Parish;
let ContactType = references.ContactType;
let Skill = references.Skill

sequelize.sync().then(function() {
    // skill
    Skill.create({
        skill: 'Carpentry'
    });

    Skill.create({
        skill: 'Plumbing'
    });

    Skill.create({
        skill: 'Graphic Design'
    });

    Skill.create({
        skill: 'Video Editing'
    });

    Skill.create({
        skill: 'Programming'
    });

    Skill.create({
        skill: 'Accounting'
    });
    // contact type
    ContactType.create({
        contactType: 'Telephone',
        contactFilter: 'churchOnly'
    });

    ContactType.create({
        contactType: 'Email',
        contactFilter: 'all'
    });

    ContactType.create({
        contactType: 'Fax',
        contactFilter: 'all'
    });

    ContactType.create({
        contactType: 'Work Phone',
        contactFilter: 'personOnly'
    });

    ContactType.create({
        contactType: 'Home Phone',
        contactFilter: 'personOnly'
    });

    ContactType.create({
        contactType: 'Mobile',
        contactFilter: 'personOnly'
    });

    // parishes
    Parish.create({
        parish: 'Clarendon',
        code: 'CL'
    });
    Parish.create({
        parish: 'Hanover',
        code: 'HA'
    });
    Parish.create({
        parish: 'Kingston',
        code: 'KI'
    })
    Parish.create({
        parish: 'Manchester',
        code: 'MA'
    });
    Parish.create({
        parish: 'Portland',
        code: 'PO'
    });
    Parish.create({
        parish: 'Saint Andrew',
        code: 'SD'
    });
    Parish.create({
        parish: 'Saint Ann',
        code: 'SN'
    });
    Parish.create({
        parish: 'Saint Catherine',
        code: 'SC'
    });
    Parish.create({
        parish: 'Saint James',
        code: 'SJ'
    });
    Parish.create({
        parish: 'Saint Elizabeth',
        code: 'SE'
    });
    Parish.create({
        parish: 'Saint Mary',
        code: 'SM'
    });
    Parish.create({
        parish: 'Saint Thomas',
        code: 'ST'
    });
    Parish.create({
        parish: 'Trelawny',
        code: 'TR'
    });
    Parish.create({
        parish: 'Westmoreland',
        code: 'WE'
    });
});
// let sequelize_conn = db_config.sequelize;

// let lookUp = require('./server/models/lookUp');
// // let Parish = lookUp.Parish;
// // let ContactType = lookUp.ContactType;
// // let Month = lookUp.Month;
// // let Profession = lookUp.Profession;
// // let Skill = lookUp.Skill;


// // let circuit = require('./server/models/circuit');
// // let church = require('./server/models/church');
// let member = require('./server/models/member');
// let visitor = require('./server/models/visitor');
// let Visitor = visitor.Visitor;
// let Member = member.Member;
// // parishes
// // sequelize_conn.sync().then(function() {
// //     Parish.create({
// //         parish: 'Clarendon',
// //         code: 'CL'
// //     });
// //     Parish.create({
// //         parish: 'Hanover',
// //         code: 'HA'
// //     });
// //     Parish.create({
// //         parish: 'Kingston',
// //         code: 'KI'
// //     })
// //     Parish.create({
// //         parish: 'Manchester',
// //         code: 'MA'
// //     });
// //     Parish.create({
// //         parish: 'Portland',
// //         code: 'PO'
// //     });
// //     Parish.create({
// //         parish: 'Saint Andrew',
// //         code: 'SD'
// //     });
// //     Parish.create({
// //         parish: 'Saint Ann',
// //         code: 'SN'
// //     });
// //     Parish.create({
// //         parish: 'Saint Catherine',
// //         code: 'SC'
// //     });
// //     Parish.create({
// //         parish: 'Saint James',
// //         code: 'SJ'
// //     });
// //     Parish.create({
// //         parish: 'Saint Elizabeth',
// //         code: 'SE'
// //     });
// //     Parish.create({
// //         parish: 'Saint Mary',
// //         code: 'SM'
// //     });
// //     Parish.create({
// //         parish: 'Saint Thomas',
// //         code: 'ST'
// //     });
// //     Parish.create({
// //         parish: 'Trelawny',
// //         code: 'TR'
// //     });
// //     Parish.create({
// //         parish: 'Westmoreland',
// //         code: 'WE'
// //     });
// // });

// // // months
// // sequelize_conn.sync().then(function() {
// //     Month.create({
// //         monthLongForm: 'January',
// //         monthShortForm: 'Jan'
// //     });

// //     Month.create({
// //         monthLongForm: 'February',
// //         monthShortForm: 'Feb'
// //     });

// //     Month.create({
// //         monthLongForm: 'March',
// //         monthShortForm: 'Mar'
// //     });

// //     Month.create({
// //         monthLongForm: 'April',
// //         monthShortForm: 'Apr'
// //     });

// //     Month.create({
// //         monthLongForm: 'May',
// //         monthShortForm: 'May'
// //     });

// //     Month.create({
// //         monthLongForm: 'June',
// //         monthShortForm: 'Jun'
// //     });

// //     Month.create({
// //         monthLongForm: 'July',
// //         monthShortForm: 'Jul'
// //     });

// //     Month.create({
// //         monthLongForm: 'August',
// //         monthShortForm: 'Aug'
// //     });

// //     Month.create({
// //         monthLongForm: 'September',
// //         monthShortForm: 'Sept'
// //     });

// //     Month.create({
// //         monthLongForm: 'October',
// //         monthShortForm: 'Oct'
// //     });

// //     Month.create({
// //         monthLongForm: 'November',
// //         monthShortForm: 'Nov'
// //     });

// //     Month.create({
// //         monthLongForm: 'December',
// //         monthShortForm: 'Dec'
// //     });
// // });

// // // contacts
// // sequelize_conn.sync().then(function() {
// //     ContactType.create({
// //         contactType: 'Telephone',
// //         contactFilter: 'churchOnly'
// //     });

// //     ContactType.create({
// //         contactType: 'Email',
// //         contactFilter: 'all'
// //     });

// //     ContactType.create({
// //         contactType: 'Fax',
// //         contactFilter: 'all'
// //     });

// //     ContactType.create({
// //         contactType: 'Work Phone',
// //         contactFilter: 'personOnly'
// //     });

// //     ContactType.create({
// //         contactType: 'Home Phone',
// //         contactFilter: 'personOnly'
// //     });

// //     ContactType.create({
// //         contactType: 'Mobile',
// //         contactFilter: 'personOnly'
// //     });
// // });

// // // skills
// // sequelize_conn.sync().then(function() {
// //     Skill.create({
// //         skill: 'Carpentry'
// //     });

// //     Skill.create({
// //         skill: 'Plumbing'
// //     });

// //     Skill.create({
// //         skill: 'Graphic Design'
// //     });

// //     Skill.create({
// //         skill: 'Video Editing'
// //     });

// //     Skill.create({
// //         skill: 'Programming'
// //     });

// //     Skill.create({
// //         skill: 'Accounting'
// //     });
// // });