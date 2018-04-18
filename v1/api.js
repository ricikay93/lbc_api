const router = require('express').Router();
const references = require('./routes/references');
// const churches = require('./routes/church');
const circuit = require('./routes/circuit');
const churches = require('./routes/church');
// const visitor = require('./visitor');
// const api = require('./api');

router.use('/lookup', references);
// router.use('/churches', churches);
router.use('/circuits', circuit);
router.use('/churches', church);
// router.use('/visitors', visitor);

module.exports = router