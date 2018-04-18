var parser = require('../../parse_parameters');
var helper = require('./church_helper')

exports.get_all_churches = function(req, res) {

    var params = parser.parse_parameters;
    var where_query = {};

    Church.findAndCountAll({
        where: where_query,
        attributes: ['id', 'church', 'dateConst', 'seat_quota'],
        include: [{
            model: Circuit,
            attributes: ['id', 'circuit', 'churchCount']
        }]
    }).then(function(result) {

        if (params.offset && params.limit) {

            let pages = Math.ceil(data.count / params.limit);
            offset = limit * (params.page - 1);

            var page = {
                limit: params.limit,
                pages: params.pages,
                page: params.page,
                count: data.count
            }

            paginationChurches(query, page, res);
        } else if (data.count == 0) {
            res.status(200).json({
                'result': data.rows,
                'count': data.count,
                'limit': limit,
                'page': page,
                'pages': pages
            });
        } else {
            res.status(200).json({
                'result': result.rows,
                'count': result.count
            });
        }



    }, function(err) {
        return { message: 'Error loading parishes. Please come back later.' + err };
    });
}

function paginationChurches(query, page, res) {

    if (page.count === 0) {
        res.status(200).json({
            'result': [],
            'count': page.count,
            'limit': page.limit,
            'page': page.page,
            'pages': pages.pages
        });
    } else {
        Church.findAll({
            attributes: ['id', 'church', 'dateConst', 'seat_quota'],
            include: [{
                model: Circuit,
                attributes: ['id', 'circuit']
            }],
            group: ['id'],
            limit: limit,
            offset: offset
        }).then((result) => {
            res.status(200).json({
                'result': result,
                'count': data.count,
                'limit': limit,
                'page': page,
                'pages': pages
            });
        });
    }
}

exports.add_church = function(req, res) {
    Church.create(req.body)
        .then(result =>
            res.json({ 'message': 'Success!' })
        )
        .catch(err =>
            res.json({ 'message': 'Fail!' })
        )
};


exports.updateChurch = function(req, res) {
    Church.update(
            req.body, { where: { id: req.params.id } }
        )
        .then(result =>
            res.json({ 'message': 'Success!' })
        )
        .catch(err =>
            res.json({ 'message': 'Fail!' })
        )
};

exports.deleteChurch = function(req, res) {
    Church.destroy({
        where: { id: req.params.id }
    }).then(function(result) {
        res.json(result);
    }, function(err) {
        return { message: 'Error loading church.' + err };
    });
};

exports.deleteChurches = function(req, res) {
    var params = parser.parse_parameters(req.query);

    Church.destroy({ where: { id: params.ids } }).then(function(result) {
        res.json(result);
    }, function(err) {
        return { message: 'Error deleting church.' + err };
    });
};