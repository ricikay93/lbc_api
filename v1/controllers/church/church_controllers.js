var Sequelize = require('sequelize');
const Op = Sequelize.Op;

let references = require('../models/references');
let churchCircuit = require('../models/circuitChurch');

let Parish = references.Parish;
let ContactType = references.ContactType;
let Church = churchCircuit.church;
let ChurchContact = churchCircuit.churchContact;
let ChurchMission = churchCircuit.churchMissiont;
let Circuit = churchCircuit.Circuit;

var get_all_churches = function(req, res) {


    if (!req.query.limit && !req.query.page) {
        var query = !req.query.q ? {} : {
            [Op.like]: '%' + req.query.q + '%'
        };

        var filters = !req.query.filter ? [] : req.query.filter;

        var seatMin = 0;
        var seatEq = 0;
        var seatMax = 0;

        function paramFilter(element) {
            var item = element.split("=");
            if (item[0] == 'seatMin') {
                seatMin = parseInt(item[1]);
            } else if (item[0] === 'seatMax') {
                seatMax = parseInt(item[1]);
            } else if (item[0] == 'seatEq') {
                seatMin = parseInt(item[1]);
            }
        };

        if (filters && filters.constructor === Array) {

            filters.forEach(element => {
                paramFilter(element);
            });
        } else {
            paramFilter(filters);
        }


        var seatFilter = {};
        if (seatMin > 0 && seatMax > 0) {
            seatFilter = {
                [Op.between]: [seatMin, seatMax]
            };
        } else if (seatMin > 0) {
            seatFilter = {
                [Op.gte]: seatMin
            };
        } else if (seatMax > 0) {
            seatFilter = {
                [Op.lte]: seatMax
            };
        } else if (seatEq > 0) {

            seatFilter = {
                [Op.eq]: seatEq
            };
        }

        Church.findAndCountAll({
            where: { circuit: query, seat_quota: seatFilter },
            attributes: ['id', 'church', 'dateConst', 'seat_quota'],
            include: [{
                model: Circuit,
                attributes: ['id', 'circuit', 'churchCount']
            }]
        }).then(function(result) {
            res.status(200).json({
                'result': result.rows,
                'count': result.count,

            });
        }, function(err) {
            return { message: 'Error loading parishes. Please come back later.' + err };
        });
    } else {
        paginationChurches(req, res);
    }



};

function paginationChurches(req, res) {
    let limit = 50;
    let page = 1;
    let offset = 0;

    var query = !req.query.q ? {} : {
        [Op.like]: '%' + req.query.q + '%'
    };

    var filters = !req.query.filter ? [] : req.query.filter;

    var seatMin = 0;
    var seatEq = 0;
    var seatMax = 0;

    function paramFilter(element) {
        var item = element.split("=");
        if (item[0] == 'seatMin') {
            seatMin = parseInt(item[1]);
        } else if (item[0] === 'seatMax') {
            seatMax = parseInt(item[1]);
        } else if (item[0] == 'seatEq') {
            seatMin = parseInt(item[1]);
        }
    };

    if (filters && filters.constructor === Array) {

        filters.forEach(element => {
            paramFilter(element);
        });
    } else {
        paramFilter(filters);
    }


    var seatFilter = {};
    if (seatMin > 0 && seatMax > 0) {
        seatFilter = {
            [Op.between]: [seatMin, seatMax]
        };
    } else if (seatMin > 0) {
        seatFilter = {
            [Op.gte]: seatMin
        };
    } else if (seatMax > 0) {
        seatFilter = {
            [Op.lte]: seatMax
        };
    } else if (seatEq > 0) {

        seatFilter = {
            [Op.eq]: seatEq
        };
    }



    Church.findAndCountAll({ where: { circuit: query, seat_quota: seatFilter } }).then(data => {
        limit = !req.query.limit ? limit : req.query.limit;
        page = !req.query.page ? page : req.query.page;

        let pages = Math.ceil(data.count / limit);
        offset = limit * (page - 1);

        if (data.count == 0) {
            res.status(200).json({
                'result': data.rows,
                'count': data.count,
                'limit': limit,
                'page': page,
                'pages': pages
            });
        } else {
            Church.findAll({
                attributes: ['id', 'church', 'dateConst', 'seat_quota'],
                include: [{
                    model: Circuit,
                    attributes: ['id', 'circuit']
                }],
                group: ['id'],
                limit: limit,
                offset: offset
            }).then((result) => {
                res.status(200).json({
                    'result': result,
                    'count': data.count,
                    'limit': limit,
                    'page': page,
                    'pages': pages
                });
            });
        }
    });
}

var find_church_by_code = function(req, res) {
    Church.find({
        where: {
            'id': req.params.id
        }
    }).then(function(result) {
        res.json(result);
    }, function(err) {
        return { message: 'Error loading churches. Please come back later.' + err };
    });
};




var add_church = function(req, res) {
    Church.create(req.body)
        .then(result =>
            res.json({ 'message': 'Success!' })
        )
        .catch(err =>
            res.json({ 'message': 'Fail!' })
        )
};


var updateChurch = function(req, res) {
    Church.update(
            req.body, { where: { id: req.params.id } }
        )
        .then(result =>
            res.json({ 'message': 'Success!' })
        )
        .catch(err =>
            res.json({ 'message': 'Fail!' })
        )
};

var deleteChurch = function(req, res) {
    Church.destroy({
        where: { id: req.params.id }
    }).then(function(result) {
        res.json(result);
    }, function(err) {
        return { message: 'Error loading church.' + err };
    });
};

var deleteChurches = function(req, res) {
    var ids = req.query.ids.split(",");

    Church.destroy({ where: { id: ids } }).then(function(result) {
        res.json(result);
    }, function(err) {
        return { message: 'Error deleting church.' + err };
    });
};

// church contacts

var getChurchContacts = function(req, res) {
    ChurchContact.findAll().then(function(result) {
        res.json(result);
    }, function(err) {
        return { message: 'Error deleting church.' + err };
    });
};

var getChurchContactByChurch = function(req, res) {
    ChurchContact.findAll({
        where: {
            churchID: req.params.church
        }
    }).then(function(result) {
        res.json(result);
    }, function(err) {
        return { message: 'Error deleting church.' + err };
    });

};

var updateChurchContact = function(req, res) {
    ChurchContact.update(req.body, {
        where: {
            id: req.param.contact
        }
    }).then(function(result) {
        res.json(result);
    }, function(err) {
        return { message: 'Error deleting church.' + err };
    });
};

var deleteChurchContact = function(req, res) {

    ChurchContact.destroy({ where: { id: req.param.church } }).then(function(result) {
        res.json(result);
    }, function(err) {
        return { message: 'Error deleting church.' + err };
    });
};

var deleteChurchContacts = function(req, res) {
    var ids = req.query.ids.split(",");

    ChurchContact.destroy({ where: { id: ids } }).then(function(result) {
        res.json(result);
    }, function(err) {
        return { message: 'Error deleting church.' + err };
    });
};

var getChurchContacts = function(req, res) {
    ChurchContact.findAll().then(function(result) {
        res.json(result);
    }, function(err) {
        return { message: 'Error deleting church.' + err };
    });
};



// var updateChurchContacts = function(req, res) {

// };

// church missions

var getChurchMissions = function(req, res) {
    ChurchMission.findAll({
        where: {
            churchID
        }
    }).then(function(result) {
        res.json(result);
    }, function(err) {
        return { message: 'Error deleting church.' + err };
    });

};

var updateChurchMission = function(req, res) {

};

var deleteChurchMission = function(req, res) {

};

var getChurchMissionByCode = function(req, res) {};

// circuits



module.exports = {
    getChurches: get_all_churches,
    getChurchByCode: find_church_by_code,
    findChurches: find_churches,
    addChurch: add_churches

};