// var models = require('../models/references');
var express = require('express');
var router = express.Router();

var controllers = require('../controllers/references');

// parishes
router.get('/parishes', controllers.getAllParishes);
router.get('/parishes/:code', controllers.getParishByCode);

// contacts 
router.get('/contact_types/all', controllers.getAllContacts);
router.get('/contact_types/people', controllers.getPeopleContacts);
router.get('/contact_types/church', controllers.getChurchContacts);

// skill

module.exports = router;