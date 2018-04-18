var parser = require('../parse_parameters');
//var helper = require('./church_helper')

exports.get_all_churches = function(req, res) {

    var params = parser.parse_parameters;
    var where_query = {};

    Member.findAndCountAll({
        where: where_query
            // attributes: ['id', 'church', 'dateConst', 'seat_quota'],
            // include: [{
            //     model: Circuit,
            //     attributes: ['id', 'circuit', 'churchCount']
            // }]
    }).then(function(result) {

        if (params.offset && params.limit) {

            let pages = Math.ceil(data.count / params.limit);
            offset = limit * (params.page - 1);

            var page = {
                offset: offset,
                limit: params.limit,
                pages: pages,
                page: params.page,
                count: data.count
            }

            paginationMember(query, page, res);
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

/**
 * 
 * @param {*} query 
 * @param {*} page 
 * @param {*} res 
 */
function paginationMember(query, page, res) {

    if (page.count === 0) {
        res.status(200).json({
            'result': [],
            'count': page.count,
            'limit': page.limit,
            'page': page.page,
            'pages': pages.pages
        });
    } else {
        Member.findAll({
            // attributes: ['id', 'church', 'dateConst', 'seat_quota'],
            // include: [{
            //     model: Circuit,
            //     attributes: ['id', 'circuit']
            // }],
            group: ['id'],
            limit: page.limit,
            offset: page.offset
        }).then((result) => {
            res.status(200).json({
                'result': result,
                'count': page.count,
                'limit': page.limit,
                'page': page.page,
                'pages': page.pages
            });
        });
    }
}

exports.add_member = function(req, res) {
    Member.create(req.body)
        .then(result =>
            res.json({ 'message': 'Success!' })
        )
        .catch(err =>
            res.json({ 'message': 'Fail!' })
        )
};


exports.update_member = function(req, res) {
    Member.update(
            req.body, { where: { id: req.params.id } }
        )
        .then(result =>
            res.json({ 'message': 'Success!' })
        )
        .catch(err =>
            res.json({ 'message': 'Fail!' })
        )
};

exports.delete_member = function(req, res) {
    Member.destroy({
        where: { id: req.params.id }
    }).then(function(result) {
        res.json(result);
    }, function(err) {
        return { message: 'Error loading church.' + err };
    });
};

exports.delete_members = function(req, res) {
    var params = parser.parse_parameters(req.query);

    Member.destroy({ where: { id: params.ids } }).then(function(result) {
        res.json(result);
    }, function(err) {
        return { message: 'Error deleting church.' + err };
    });
};