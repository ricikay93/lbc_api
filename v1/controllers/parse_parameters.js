/**
 * Function that creates the parameters object. It returns only the parameters 
 * that were set in the parameters of the API enpoint call. 
 * e.g. if limit isnt a parameter the function will not return it.
 * @param {*} req 
 * @returns {string: object } params object
 */
var parse_parameters = function(req) {

    var params = {};

    //   console.log('Attributes' + req.query.keys);

    try {
        if (req.query.attributes !== undefined && req.query.attributes !== null) {
            params["attributes"] = param_attr_spliter(req.query.attributes);
        }

        if (req.query.result !== undefined && req.query.result !== null) {
            params["result_type"] = req.query.result;
        } else {
            params["result_type"] = "data";
        }

        if (req.query.page !== undefined && req.query.page !== null) {
            var page_cnt = {};


            page_cnt["page"] = parseInt(req.query.page);
            if (req.query.limit !== undefined && req.query.limit !== null) {
                page_cnt["limit"] = parseInt(req.query.limit);
            } else {
                page_cnt["limit"] = 40;
            }

            params['page_content'] = page_cnt;
        } else if (req.query.result === 'data') {
            if (req.query.limit !== undefined && req.query.limit !== null) {
                var page_cnt = {};

                page_cnt["page"] = 1;
                page_cnt["limit"] = parseInt(req.query.limit);
                params['page_content'] = page_cnt;
            } else {
                var page_cnt = {};

                page_cnt["page"] = 1;
                page_cnt["limit"] = 40;

                params['page_content'] = page_cnt;
            }
        }





        // if searching for keys all others are irrevalent so the params are returned.
        if (req.query.keys !== undefined && req.query.keys !== null) {
            params["keys"] = param_attr_spliter(req.query.keys);
        } else {
            if (req.query.filter !== undefined && req.query.filter !== null) {
                params["filters"] = param_attr_spliter(req.query.filter);


            }
            if (req.query.q !== undefined && req.query.q !== null) {
                params["q"] = {};

                params.q["value"] = req.query.q;
                if (req.query.search !== undefined && req.query.search !== null) {
                    params.q["search"] = param_attr_spliter(req.query.search);
                }
                console.log('Par: ' + JSON.stringify(params.q));
                // params["q"] = [];
                // params.q[0] = tmp_params;
            }
        }
    } catch (err) {}

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

module.exports = {
    csvAtrrsplitter: param_attr_spliter,
    parseParameters: parse_parameters
};