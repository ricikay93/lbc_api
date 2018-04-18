var Sequelize = require('sequelize');
const Op = Sequelize.Op;

let references = require('../models/references');
let church = require('../models/church');

let Parish = references.Parish;
let ContactType = references.ContactType;
let Church = church.church;
let Visitor = church.Visitor;
let ChurchVisited = church.ChurchVisited;

var get_visitors = function(req, res) {
    if (!req.query.limit && !req.query.page) {

        // filters: parent: letter, orderBy: lastName, firstName, order: ASC, DESC
        // order: [
        // Will escape title and validate DESC against a list of valid direction parameters
        //['title', 'DESC'],]
        // Church.findAndCountAll({
        //     where: { circuit: query, seat_quota: seatFilter },
        //     attributes: ['id', 'church', 'dateConst', 'seat_quota'],
        //     include: [{
        //         model: Circuit,
        //         attributes: ['id', 'circuit', 'churchCount']
        //     }]
        // }).then(function(result) {
        //     res.status(200).json({
        //         'result': result.rows,
        //         'count': result.count,

        //     });
        // }, function(err) {
        //     return { message: 'Error loading parishes. Please come back later.' + err };
        // });
    } else {
        paginationVisitors(req, res);
    }
};

function paginationVisitors(req, res) {};

var get_a_visitor = function(req, res) {};

var edit_visitor = function(req, res) {};

var delete_visitor = function(req, res) {};

var delete_visitors = function(req, res) {};

var edit_visitor_times = function(req, res) {};

var delete_visit_time = function(req, res) {};

var delete_visit_times = function(req, res) {};



var get_parent_nodes = function(req, res) {};

var add_visitor = function(req, res) {};

var add_visit_time = function(req, res) {};




module.exports = {
    getVisitors: get_visitors,
    getVisitorByCode: get_a_visitor
};