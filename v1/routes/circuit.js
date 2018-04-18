// var models = require('../models/references');
var express = require('express');
var router = express.Router();

var controllers = require('../controllers/circuit/circuit_controllers');
var middleware = require('../controllers/circuit/circuit_middleware');
router.route('/')
    .get(controllers.get_all_circuits)
    .post(middleware.validateCircuit, controllers.add_circuit)
    .delete(controllers.delete_circuits);

router.route('/:id([0-9]+')
    .get(controllers.get_a_circuit)
    .put(controllers.edit_circuit)
    .delete(controllers.delete_circuit);


module.exports = router;