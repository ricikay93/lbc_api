// var models = require('../models/references');
var express = require('express');
var router = express.Router();

var controllers = require('../controllers/church');

router.get('/', controllers.getChurches)
    .post('/', controllers.addChurch);


router.get('/:id', controllers.getChurchByCode);


module.exports = router;