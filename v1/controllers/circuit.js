var Sequelize = require('sequelize');
const Op = Sequelize.Op;
var config = require('../config/config');

let sequelize = config.sequelize;

let references = require('../models/references');
let churchCircuit = require('../models/circuitChurch');


let Parish = references.Parish;
let ContactType = references.ContactType;
let Circuit = churchCircuit.circuit;
let Church = churchCircuit.church;

var get_all_circuits = function(req, res) {

    if (!req.query.limit && !req.query.page) {
        var query = !req.query.q ? {} : {
            [Op.like]: '%' + req.query.q + '%'
        };

        var filters = !req.query.filter ? [] : req.query.filter;
        var parish = [];


        // create operator for parish
        if (filters && filters.constructor === Array) {
            filters.forEach(element => {
                var item = element.split("=");
                if (item[0] == 'parish') {
                    parish.push({ assocParish: item[1] });
                }
            });
        } else {
            var item = filters.split("=");
            if (item[0] == 'parish') {
                parish.push({ assocParish: item[1] });
            }
        }



        Circuit.findAndCountAll({
            where: { circuit: query, [Op.or]: parish },
            attributes: ['id', 'circuit', 'churchCount'],
            include: [{
                model: Parish,
                attributes: ['code', 'parish']
            }],
        }).then(function(result) {
            res.status(200).json({
                'result': result.rows,
                'count': result.count,

            });
        }, function(err) {
            return { message: 'Error loading parishes. Please come back later.' + err };
        });
    } else {
        paginationCircuits(req, res);
    }

    // findAndCountAll is the model for searching multiple records in the 
    // database and it returns both the data required and the count of elements
    // in that table. The above query will get 50 user records at once until 
    // the next page is called to fetch the next 50 records. limit and offset 
    //are required in queries related to pagination in which limit fetches the 
    //number of rows based on the query whereas offset is used to skip the number of rows in the database table.
};

function paginationCircuits(req, res) {
    let limit = 50;
    let page = 1;
    let offset = 0;
    var query = !req.query.q ? {} : {
        [Op.like]: '%' + req.query.q + '%'
    };

    var filters = !req.query.filter ? [] : req.query.filter;

    var parish = [];

    filters.forEach(element => {
        var item = element.split("=");
        if (item[0] == 'parish') {
            parish.push({ assocParish: item[1] });
        }
    });

    Circuit.findAndCountAll({ where: { circuit: query, [Op.or]: parish } }).then(data => {

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
            Circuit.findAll({
                where: { circuit: query, [Op.or]: parish },
                attributes: ['id', 'circuit', 'churchCount'],
                include: [{
                    model: Parish,
                    attributes: ['code', 'parish']
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



    }).catch(function(error) {
        res.status(500).send('Internal Server Error');
    });

}


var get_a_circuit = function(req, res) {
    Circuit.findById(req.param.id).then((result) => {
        res.status(200).json({
            'result': result
        });
    }).catch(function(error) {
        res.status(500).send('Internal Server Error');
    });
};

var add_circuit = function(req, res) {

    if (!req.body) { res.status(500).send('Internal Server Error'); } else {
        var newCircuit = new Circuit(req.body);

        newCircuit.save().then((result) => {
            res.status(201).json({
                'message': 'Success'
            });
        }).catch(function(error) {
            res.status(500).send('Internal Server Error');
        });
    }

};

var edit_circuit = function(req, res) {
    if (!req.body) { res.status(500).send('Internal Server Error'); } else {
        Circuit.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.status(201).json({
                'message': 'Success'
            });
        }).catch(function(error) {
            res.status(500).send('Internal Server Error');
        });
    }
};

var delete_circuit = function(req, res) {
    Circuit.destroy({
        where: {
            id: req.params.id
        }
    }).then((result) => {
        res.status(201).json({
            'message': 'Church deleted'
        });
    }).catch(function(error) {
        res.status(500).send('Internal Server Error');
    });
};

var delete_circuits = function(req, res) {

    var ids = !req.query.ids ? [] : req.query.ids.split(',');

    if (ids.length === 0) {
        res.status(500).json({
            'message': 'No Circuits to delete'
        });
    } else {
        Circuit.destroy({
            where: {
                id: { in: ids }
            }
        }).then((result) => {
            res.status(201).json({
                'message': 'Churches deleted'
            });
        }).catch(function(error) {
            res.status(500).send('Internal Server Error');
        });
    }

};

module.exports = {
    getAllCircuits: get_all_circuits,
    getCircuitByCode: get_a_circuit,
    createCircuit: add_circuit,
    updateCircuit: edit_circuit,
    deleteCircuit: delete_circuit,
    deleteCircuitsInBulk: delete_circuits
};