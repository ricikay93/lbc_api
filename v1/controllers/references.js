var Sequelize = require('sequelize');
const Op = Sequelize.Op;

let references = require('../models/references');

let Parish = references.Parish;
let ContactType = references.ContactType;
let Skill = references.Skill;

/**
 * Get all parishes
 * @param {*} req 
 * @param {*} res 
 */
var get_all_parishes = function(req, res) {
    Parish.findAll({
        attributes: ['code', 'parish']
    }).then(function(result) {
        res.json(result);
    }, function(err) {
        return { message: 'Error loading parishes. Please come back later.' + err };
    });
};

/**
 * Get a parish
 * @param {*} req 
 * @param {*} res 
 */
var get_a_parish = function(req, res) {
    Parish.findOne({
        attributes: ['code', 'parish'],
        where: {
            code: req.params.code
        }
    }).then(function(result) {
        res.json(result);
    }, function(err) {
        res.json({ message: 'Error loading parishes. Please refresh.' })
    });
};

/**
 * Get all contact types.
 * @param {*} req 
 * @param {*} res 
 */
var get_all_contacts = function(req, res) {
    ContactType.findAll().then(function(result) {
        res.json(result);
    }, function(err) {
        res.json({ message: 'Error loading parishes: ' + err })
    });
};

/**
 * get contact type by code
 * @param {*} req 
 * @param {*} res 
 */
var get_contact_type = function(req, res) {
    ContactType.findById(req.params.id).then(function(result) {
        res.json(result);
    }, function(err) {
        res.json({ message: 'Error loading parishes: ' + err })
    });
};

/**
 * get contacts by church criteria
 * @param {*} req 
 * @param {*} res 
 */
var get_church_contacts = function(req, res) {
    ContactType.findAll({
        where: {
            contactFilter: 'churchOnly'
        }
    }).then(function(result) {
        res.json(result);
    }, function(err) {
        res.json({ message: 'Error loading parishes: ' + err })
    });
};

/**
 * get contacts by people criteria
 * @param {*} req 
 * @param {*} res 
 */
var get_people_contacts = function(req, res) {
    ContactType.findAll({
        where: {
            contactFilter: 'peopleOnly'
        }
    }).then(function(result) {
        res.json(result);
    }, function(err) {
        res.json({ message: 'Error loading parishes: ' + err })
    });
};


var get_skills = function(req, res) {
    Skill.findAll().then(function(result) {
        res.json(result);
    }, function(err) {
        res.json({ message: 'Error loading parishes: ' + err })
    });
};

var get_skill = function(req, res) {
    Skill.findById(req.params.id).then(function(result) {
        res.json(result);
    }, function(err) {
        res.json({ message: 'Error loading parishes: ' + err })
    });
};

var edit_skill = function(req, res) {};

var add_skill = function(req, res) {};

var delete_skill = function(req, res) {
    Skill.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(result) {
        res.json({ 'message': 'Success!' });
    }, function(err) {
        res.json({ message: 'Error loading parishes: ' + err })
    });
};

/**
 * exports
 */
module.exports = {
    getAllParishes: get_all_parishes,
    getParishByCode: get_a_parish,
    getAllContacts: get_all_contacts,
    getContactByCode: get_contact_type,
    getChurchContacts: get_church_contacts,
    getPeopleContacts: get_people_contacts,
    getSkill: get_skill,
    getSkills: get_skills,
    addSkill: add_skill,
    updateSkill: edit_skill,
    deleteSkill: delete_skill
};