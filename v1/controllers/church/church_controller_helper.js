let parser = require('../parse_parameters');
var config = require('../../config/config');

let sequelize = config.sequelize;
let Op = sequelize.Op;

/**
 * Gets the 
 * @param {*} element 
 */
var paramFilter = function(element) {

    var filter_lst = {};
    console.log('Element: ' + JSON.stringify(element));
    element.forEach(result => {
        var item = result.split("=");

        var value = parser.csvAtrrsplitter(item[1]);

        if (item[0] == 'dateMin' || item[0] === 'dateMax' || item[0] === 'dateEq') {
            filter_lst['date'][item[0]] = item[1];
        }


        if (item[0] == 'seatMin' || item[0] === 'seatMax' || item[0] === 'seatEq') {
            filter_lst['quota'][item[0]] = parseInt(item[1]);
        }

        if (item[0] == 'circuit') {
            if (filter_lst.circuits === undefined || filter_lst.circuits === null) {
                filter_lst['circuits'] = [];
            }

            filter_lst.circuits.push(value);
        }
        //  [Op.like]: '%' + req.query.q + '%'
    });

    return filter_lst;
};


// /**
//  * Generate syntax for search criteria
//  * @param {*} element 
//  */
var paramSearch = function(element) {
    var criteria_result = {};
    if (element.q.value != undefined) {
        var query = {
            [Op.like]: '%' + element.q.value + '%'
        };

        // if (element.q.search != undefined) {
        //     var criteria = parser.param_attr_spliter(element.q.search);

        //     if (criteria !== []) {
        //         criteria = criteria.forEach(element => {
        searchby = ['circuit']
            //             if (searchby.indexOf(element) >= 0) {
        criteria_result[searchby] = query;
        //             }
        //         });
        //     }
        // }
    }

    return criteria_result;
    // };
}


/**
 *Generate syntax for filtering by seat quota
 * @param {*} element 
 */
var paramSeatCount = function(filters) {
    var result = {};
    var element = filters.quota;
    // element.forEach(element => {

    //parseInt through every value to ensure 
    if (element.seatMin > 0 && element.seatMax > 0) {
        result = {
            [Op.between]: [element.seatMin, element.seatMax]
        };
    } else if (element.seatMin > 0) {
        result = {
            [Op.gte]: element.seatMin
        };
    } else if (element.seatMax > 0) {
        result = {
            [Op.lte]: element.seatMax
        };
    } else if (element.seatEq > 0) {

        result = {
            [Op.eq]: element.seatEq
        };
    }
    // });

    return result;
}










// /**
//  * Generates full where search attribute
//  * @param {*} element 
//  */
var paramWhereQuery = function(element) {

    var where_query = {};

    // if (element.q !== {}) {
    //     var search = paramSearch(element);
    // }

    if (element.filters !== undefined) {


        var filters = paramFilter(element.filters);

        //     // //         // if (filters.quota != undefined) {
        //     // //         //     where_query['seat_quota'] = paramSeatCount(filters.quota);
        //     // //  



        if (filters.quota !== undefined) {
            console.log('Quota' + JSON.stringify(filters.quota));
            where_query['seat_quota'] = paramSeatCount(filters.quota);
        }


        if (filters.circuits != undefined) {
            console.log('Circuits' + JSON.stringify(filters.circuits));
            where_query['circuit'] = { $in: filters.circuits };
        }



        if (filters.date != undefined) {
            where_query['dateConst'] = paramDate(filters.date);
        }


    }



    return where_query;
}

var createFullQuery = function(element) {
    var where_query = {};


    if (element !== {}) {
        //create attributes list (level 1)
        if (element.attributes != undefined) {
            var index = element.attributes.indexOf('quota');
            if (index !== -1) {
                element.attributes[index] = 'seat_quota';
            }

            //id should ALWAYS be returned as an attribute
            var id_index = element.attributes.indexOf('id');
            if (id_index !== -1) {
                element.attributes.push('id');
            }
            where_query['attributes'] = element.attributes;

        }

        //create list of keys for which records should be returned
        if (element.keys != undefined) {
            where_query['id'] = { $in: element.keys };

            return where_query;
        } else {
            where_section = this.paramWhereQuery(element);

            if (where_section !== undefined || Object.keys(where_section).length !== 0 || where_section !== null)
                where_query['where'] = where_section;
        }
    }


    return where_query;

}

module.exports = {
    paramWhereQuery: paramWhereQuery,
    createFullQuery: createFullQuery
}



// /**
//  * Generate syntax for search criteria
//  * @param {*} element 
//  */
// var paramSearch = function(element) {
//     var criteria_result = {};
//     if (element.q.value != undefined) {
//         var query = {
//             [Op.like]: '%' + element.q.value + '%'
//         };

//         if (element.q.search != undefined) {
//             var criteria = parser.param_attr_spliter(element.q.search);

//             if (criteria != []) {
//                 criteria = criteria.forEach(element => {
//                     searchby = ['church']
//                     if (searchby.indexOf(element) >= 0) {
//                         criteria_result[element] = query;
//                     }
//                 });
//             }
//         }
//     }

//     return criteria_result;
// };



var paramParish = function(filters) {

    var parish_lst = [];
    var result = {};

    filters.forEach(element => {
        parish_lst.push({ "parish": element })
    });

    result = {
        [Op.or]: parish_lst
    };

    return result;
};

var paramDate = function(filters) {
    var result = {};
    var element = filters.date;
    // filters.forEach(element => {
    if (element.dateMin != undefined && element.dateMax != undefined) {
        if (dateValidator(element.dateMin) && dateValidator(element.dateMax)) {
            var minDateParse = dateParser(element.dateMin);
            var maxDateParse = dateParser(element.dateMax);

            var minDate = new Date(minDateParse[0], minDateParse[1], minDateParse[2]);
            var maxDate = new Date(maxDateParse[0], maxDateParse[1], maxDateParse[2]);

            result = {
                [Op.between]: [minDate, maxDate]
            };
        }
    } else if (element.dateMin != undefined) {
        var minDateParse = dateParser(element.dateMin);


        if (dateValidator(element.dateMin)) {
            var minDate = new Date(minDateParse[0], minDateParse[1], minDateParse[2]);

            result = {
                [Op.gte]: minDate
            };
        }


    } else if (element.dateMax != undefined) {
        var maxDateParse = dateParser(element.dateMax);
        if (dateValidator(element.dateMax)) {
            var maxDate = new Date(maxDateParse[0], maxDateParse[1], maxDateParse[2]);

            result = {
                [Op.lte]: maxDate
            };
        }


    } else if (element.dateEq != undefined) {
        var eqDateParse = dateParser(element.dateEq);

        if (dateValidator(element.dateEq)) {
            var eqDate = new Date(eqDateParse[0], eqDateParse[1], eqDateParse[2]);
            result = {
                [Op.eq]: eqDate
            };
        }


    }
    // });

    return result;
}

var dateValidator = function(date) {
    var patt = new RegExp('/^\d{4}\-\d{1,2}\-\d{1,2}$/');
    return patt.test(date);
}

var dateParser = function(date) {
    return date.split("-").map(function(item) {
        return item.trim();
    });
}

// /**
//  * Generates full where search attribute
//  * @param {*} element 
//  */
// exports.paramGen = function(element) {

//     var where_query = {};

//     // criteria for search by....
//     where_query = paramSearch(element);

//     //TODO: create attributes
//     if (element.filters != undefined) {
//         var filters = paramFilter(element.filters);

//         if (filters.quota != undefined) {
//             where_query['seat_quota'] = paramSeatCount(filters.quota);
//         }

//         if (filters.parishes != undefined) {
//             where_query['assocParish'] = paramParish(filters.parishes);
//         }

//         if (filters.date != undefined) {
//             where_query['dateConst'] = paramDate(filters.date);
//         }
//     }





//     return where_query;
// }