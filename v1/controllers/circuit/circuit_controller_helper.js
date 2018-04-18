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
        if (item[0] == 'parish') {
            // var parish = parser.csvAtrrsplitter(item[1]);
            // console.log('Item 1: ' + parish);

            if (filter_lst.parishes === undefined || filter_lst.parishes === null) {
                filter_lst['parishes'] = [];
            }

            filter_lst.parishes.push(value);
            // filter_lst.parishes.push({ assocParish: value });

        } else if (item[0] == 'circuit') {
            if (filter_lst.circuits === undefined || filter_lst.circuits === null) {
                filter_lst['circuits'] = [];
            }

            filter_lst.circuits.push({ "circuit": value });
        }

    });

    return filter_lst;
};

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
//                     searchby = ['circuit']
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

var paramKeys = function(keys) {

    var key_lst = [];
    var result = {};

    keys.forEach(element => {
        var num = 0;
        if (element != null) {
            if (!isNaN(that)) {
                //radix is 10 for base10 which we are accustomed to counting in
                num = parseInt(element, 10);
            }
        }

        if (num !== 0 && num !== null && num !== undefined) {
            key_lst.push({ "id": num });
        }
    });


    if (key_lst !== []) {
        result = {
            [Op.or]: key_lst
        };
    }


    return result;
}





// /**
//  * Generates full where search attribute
//  * @param {*} element 
//  */
var paramWhereQuery = function(element) {

    var where_query = {};

    if (element.filters !== undefined) {


        var filters = paramFilter(element.filters);

        //     // //         // if (filters.quota != undefined) {
        //     // //         //     where_query['seat_quota'] = paramSeatCount(filters.quota);
        //     // //  



        if (filters.parishes !== undefined) {
            //         console.log('Parishes' + JSON.stringify(filters.parishes));

            where_query['assocParish'] = {
                [Op.or]: filters.parishes
            };
        }


        //     if (filters.circuits != undefined) {
        //         console.log('Circuits' + JSON.stringify(filters.circuits));
        //     }



        //         // if (filters.date != undefined) {
        //         //     where_query['dateConst'] = paramDate(filters.date);
        //         // }


    }



    return where_query;
}

var createFullQuery = function(element) {
    var where_query = {};


    if (element !== {}) {
        if (element.attributes != undefined) {
            var index = element.attributes.indexOf('parish');
            if (index !== -1) {
                element.attributes[index] = 'assocParish';
            }

            //id should ALWAYS be returned as an attribute
            var id_index = element.attributes.indexOf('id');
            if (id_index !== -1) {
                element.attributes.push('id');
            }
            where_query['attributes'] = element.attributes;

        }
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