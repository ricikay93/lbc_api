const router = require('express').Router();
const references = require('./routes/references');
// const churches = require('./routes/church');
const circuit = require('./routes/circuit');
const churches = require('./routes/church');
// const visitor = require('./visitor');


router.use('/lookup', references);
router.use('/circuits', circuit);
router.use('/churches', churches);
// router.use('/visitors', visitor);

module.exports = router