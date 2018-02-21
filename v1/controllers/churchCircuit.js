var Sequelize = require('sequelize');
const Op = Sequelize.Op;

let references = require('../models/references');
let churchCircuit = require('../models/circuitChurch');

let Parish = references.Parish;
let ContactType = references.ContactType;
let Church = churchCircuit.Church;
let Circuit = churchCircuit.Circuit;

var getChurches = function(req, res) {};

var getChurch = function(req, res) {};

var findChurchByCode = function(req, res) {};

var findChurches = function(req, res) {};

var updateChurch = function(req, res) {};

var deleteChurch = function(req, res) {};

// church contacts

var getChurchContacts = function(req, res) {};

var updateChurchContact = function(req, res) {};

var deleteChurchContact = function(req, res) {};

var getChurchContactByCode = function(req, res) {};

var findChurchContacts = function(req, res) {};

// church missions

var getChurchMissions = function(req, res) {};

var findChurchMissions = function(req, res) {};

var updateChurchMission = function(req, res) {};

var deleteChurchMission = function(req, res) {};

var getChurchMissionByCode = function(req, res) {};

// circuits

var getCircuits = function(req, res) {};

var getCircuit = function(req, res) {};