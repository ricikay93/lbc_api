/**
 * Function that creates the parameters object. It returns only the parameters 
 * that were set in the parameters of the API enpoint call. 
 * e.g. if limit isnt a parameter the function will not return it.
 * @param {*} req 
 * @returns {string: object } params object
 */
exports.parse_parameters = function(req) {

    var params = {};

    console.log('Attributes' + req.query.keys);


    // if searching for keys all others are irrevalent so the params are returned.
    if (req.query.keys !== undefined && req.query.keys !== null) {
        params["ids"] = param_attr_spliter(req.query.keys).forEach(item => {
            return parseInt(item, 10);
        });

        return params;
    }

    if (req.query.attributes !== undefined && req.query.attributes !== null) {
        params["attributes"] = param_attr_spliter(req.query.attributes);
    }

    if (req.query.filter !== undefined && req.query.filter !== null) {
        params["filters"] = param_attr_spliter(req.query.filter);


    }
    if (req.query.q !== undefined && req.query.q !== null) {
        var tmp_params = {};

        tmp_params["value"] = param_attr_spliter(req.query.q);
        if (req.query.search !== undefined && req.query.search !== null) {
            tmp_params["search"] = param_attr_spliter(req.query.search);
        }

        params["q"] = [];
        params.q[0] = tmp_params;
    }

    if (req.query.page !== undefined && req.query.page !== null) {
        params["page"] = parseInt(req.query.page);
        if (req.query.limit !== undefined && req.query.limit !== null) {
            params["limit"] = parseInt(req.query.limit);
        } else {
            params["limit"] = 40;
        }

    } else if (req.query.limit !== undefined && req.query.limit !== null) {
        params["limit"] = parseInt(req.query.limit);
    }


    return params;
}

/**
 * This is a recursive function that parses the attributes on a leveled basic.
 * @param {*} val 
 */
var attribute_splitter = function(val) {
    var temp = val.match(/\(([^)]+)\)/)[1];

    return param_attr_spliter(temp);
}

/**
 * Parse a csv value into a trimmed array. It is trimmed as unnecessay spacing may be in the array
 * e.g. [" a"," b ","c"] should be ["a","b","c"].
 * @param {*} val 
 */
var param_attr_spliter = function(val) {
    return val.split(",").map(function(item) {
        return item.trim();
    });
}