function validateCircuit(req, res) {
    req.checkBody('parish', 'Invalid parish').notEmpty();
    req.checkBody('circuit', 'Invalid circuit').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        var response = { errors: [] };
        errors.forEach(function(err) {
            response.errors.push(err.msg);
        });
        res.statusCode = 400;
        return res.json(response);
    }
}



module.exports = {
    validateCircuit: validateCircuit
}