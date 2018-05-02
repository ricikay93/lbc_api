var Sequelize = require('sequelize');
const Op = Sequelize.Op;

let references = require('../../models/references');
let churchCircuit = require('../../models/circuitChurch');

let Parish = references.Parish;
let ContactType = references.ContactType;
let Church = churchCircuit.church;
let ChurchContact = churchCircuit.churchContact;
let ChurchMission = churchCircuit.churchMissiont;
let Circuit = churchCircuit.Circuit;

let parser = require('../parse_parameters');
let helper = require('./church_controller_helper');

exports.get_all_churches = function(req, res) {
    if (req.query !== null && req.query !== undefined && Object.keys(req.query).length !== 0) {
        console.log('Query: ' + JSON.stringify(req.query));
        var params = parser.parseParameters(req);
        console.log('Query: ' + JSON.stringify(params));

        if (Object.keys(params).length === 0 || params === null || params === undefined) {
            getAllChurchesNoFilter(res);
        } else {
            getAllChurchesWithFilter(params, res);
        }

    } else {
        getAllChurchesNoFilter(res);
    }


    // findAndCountAll is the model for searching multiple records in the 
    // database and it returns both the data required and the count of elements
    // in that table. The above query will get 50 user records at once until 
    // the next page is called to fetch the next 50 records. limit and offset 
    //are required in queries related to pagination in which limit fetches the 
    //number of rows based on the query whereas offset is used to skip the number of rows in the database table.
};

function getAllChurchesWithFilter(params, res) {
    var complete_query = helper.createFullQuery(params);

    // if any of the values passed are invalid, return an error message how?

    Church.findAndCountAll(complete_query).then(function(data) {

        if (params.result_type === 'count') {
            res.status(200).json({
                'count': data.count,
                'data': 'churches'
            })
        } else if (params.result_type === 'data') {
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

                Church.findAll(complete_query).then(result => {
                    params.page_content['result'] = data.rows;
                    res.status(200).json(params.page_content);
                });

            } else {
                res.status(200).json({
                    'result': result.rows,
                    'count': params.page_content.count
                });
            }
        }


    });
    //res.json({ 'message': 'OK' });
}

function getAllChurchesNoFilter(res) {
    Church.findAndCountAll({
        include: [{
            model: Circuit,
            attributes: ['id', 'circuit', 'churchCount']
        }]
    }).then(function(result) {
        res.status(200).json({
            'result': result.rows,
            'count': result.count
        });
    });
}

exports.add_church = function(req, res) {

    if (!req.body) { res.status(500).send('Internal Server Error'); } else {

        // var json = JSON.parse(JSON.stringify(req.body).split('"parish":').join('"assocParish":'));

        var newChurch = new Circuit(json);

        newChurch.save().then((result) => {
            res.status(201).json({
                'message': 'Success'
            });
        }).catch(function(error) {
            res.status(500).send('Internal Server Error');
        });
    }

};

exports.edit_church = function(req, res) {
    if (!req.body) { res.status(500).send('Internal Server Error'); } else {
        Church.update(req.body, {
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