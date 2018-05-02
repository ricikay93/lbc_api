// var models = require('../models/references');
var express = require('express');
var router = express.Router();

var controllers = require('../controllers/church/church_controllers');
router.route('/')
    .get(controllers.get_all_churches);
//     .post('/', controllers.addChurch);


// router.get('/:id', controllers.getChurchByCode);


module.exports = router;