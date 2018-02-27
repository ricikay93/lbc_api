// var models = require('../models/references');
var express = require('express');
var router = express.Router();

var controllers = require('../controllers/circuit');

router.route('/')
    .get(controllers.getAllCircuits)
    .post(controllers.createCircuit)
    .delete(controllers.deleteCircuitsInBulk);

router.route('/:id')
    .get(controllers.getCircuitByCode)
    .put(controllers.updateCircuit)
    .delete(controllers.deleteCircuit);


module.exports = router;