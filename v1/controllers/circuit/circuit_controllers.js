// import { paramWhereQuery } from './circuit_controller_helper';

var Sequelize = require('sequelize');
const Op = Sequelize.Op;
var config = require('../../config/config');

let sequelize = config.sequelize;

let references = require('../../models/references');
let churchCircuit = require('../../models/circuitChurch');


let Parish = references.Parish;
let ContactType = references.ContactType;
let Circuit = churchCircuit.circuit;
let Church = churchCircuit.church;

let parser = require('../parse_parameters');
let helper = require('./circuit_controller_helper');

exports.get_all_circuits = function(req, res) {
    if (req.query !== null && req.query !== undefined && Object.keys(req.query).length !== 0) {
        var where_query = {};

        var params = parser.parseParameters(req);


        if (Object.keys(params).length === 0 || params === null || params === undefined) {
            getAllCircuitsNoFilter(res);
        } else {
            getAllCircuitsWithFilter(params, res);
        }
        // res.json({ 'message': 'OK with params' });
    } else {
        getAllCircuitsNoFilter(res);
    }


    // findAndCountAll is the model for searching multiple records in the 
    // database and it returns both the data required and the count of elements
    // in that table. The above query will get 50 user records at once until 
    // the next page is called to fetch the next 50 records. limit and offset 
    //are required in queries related to pagination in which limit fetches the 
    //number of rows based on the query whereas offset is used to skip the number of rows in the database table.
};

function getAllCircuitsWithFilter(params, res) {

    var complete_query = helper.createFullQuery(params);
    //   console.log(JSON.stringify(where_query));

    Circuit.findAndCountAll(complete_query).then(function(data) {
        //   console.log('cont' + JSON.stringify(data.count));

        let pages = Math.ceil(data.count / params.page_content.limit);
        params.page_content['pages'] = pages;

        params.page_content['count'] = data.count;

        if (data.count == 0) {
            params.page_content['result'] = data.rows;
            res.status(200).json(params.page_content);

        } else if (params.page_content.limit && params.page_content.page) {
            complete_query['group'] = ['id'];
            complete_query['limit'] = params.page_content.limit;
            complete_query['offset'] = params.page_content.limit * (params.page_content.page - 1);

            Circuit.findAll(complete_query).then(result => {
                params.page_content['result'] = data.rows;
                res.status(200).json(params.page_content);
            });

        } else {
            res.status(200).json({
                'result': result.rows,
                'count': params.page_content.count
            });
        }

    });
}

function getAllCircuitsNoFilter(res) {
    Circuit.findAndCountAll().then(function(result) {
        res.status(200).json({
            'result': result.rows,
            'count': result.count
        });
    });
}

// only attributes can be used since it filters by the id already
exports.get_a_circuit = function(req, res) {

    //  console.log('ID: ' + req.params.id);

    if (req.params !== null && req.params !== undefined && Object.keys(req.params).length !== 0) {
        if (req.query !== null && req.query !== undefined && Object.keys(req.query).length !== 0) {
            var params = parser.parseParameters(req);

            var attr_param = {};
            attr_param['attributes'] = params.attributes;
            var complete_query = helper.createFullQuery(attr_param);

            if (complete_query.where === undefined || Object.keys(complete_query.where).length === 0 || complete_query.where === null) {
                complete_query['where'] = {};
            }

            complete_query['include'] = [];

            complete_query.include.push({
                model: Parish,
                attributes: ['code', 'parish']
            })


            complete_query['where']['id'] = req.params.id;


            console.log(JSON.stringify(complete_query));

            Circuit.find(complete_query).then((result) => {
                res.status(200).json({
                    'result': result
                });
            }).catch(function(error) {
                res.status(500).send('Internal Server Error');
            });

        } else {

            var complete_query = {};

            if (complete_query.where === undefined || Object.keys(complete_query.where).length === 0 || complete_query.where === null) {
                complete_query['where'] = {};
            }

            complete_query['include'] = [];

            complete_query.include.push({
                model: Parish,
                attributes: ['code', 'parish']
            })


            complete_query['where']['id'] = req.params.id;

            Circuit.find(complete_query).then((result) => {
                res.status(200).json({
                    'result': result
                });
            }).catch(function(error) {
                res.status(500).send('Internal Server Error');
            });
        }
    } else {
        res.status(500).json({ 'message': 'Invalid ID' });
    }


};

exports.add_circuit = function(req, res) {

    if (!req.body) { res.status(500).send('Internal Server Error'); } else {

        var json = JSON.parse(JSON.stringify(req.body).split('"parish":').join('"assocParish":'));

        var newCircuit = new Circuit(json);

        newCircuit.save().then((result) => {
            res.status(201).json({
                'message': 'Success'
            });
        }).catch(function(error) {
            res.status(500).send('Internal Server Error');
        });
    }

};

exports.edit_circuit = function(req, res) {
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

exports.delete_circuit = function(req, res) {
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

exports.delete_circuits = function(req, res) {

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

    //     const ids = req.body.ids;
    //   db.owners.findAll({
    //     where: { id: { $in: ids } }
    //   })
    //     .then(owners => {
    //       const deletePromises = owners.map(owner => {
    //         return owner.destroy();
    //       });
    //       return db.Sequelize.Promise.all(deletePromises)
    //     })
    //     .then(deletedOwners => {
    //       res.json(deletedOwners);
    //     });

};