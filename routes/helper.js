var config = require("./../config.json"),
	_ = require("lodash");

module.exports = {
    returnAll: function(items, req, res, options={}) {
        var page = req.query.page || 1,
            offset = (page - 1) * (options.page_size || config.pagination.page_size),
            fields = (req.query.fields && req.query.fields.split(',')) || [],
            paginatedItems = _.slice(items, offset).slice(0, (options.page_size || config.pagination.page_size));

        if (fields && fields.length) {
            paginatedItems = paginatedItems.map(item => _.pick(item, (val, key) => fields.includes(key)));
        }

        return res.status(200).send({
            page: parseInt(page),
            per_page: options.page_size || config.pagination.page_size,
            total: items.length,
            total_pages: Math.ceil(items.length / (options.page_size || config.pagination.page_size)),
            data: paginatedItems
        });
    },

    returnSingle: function(items, itemArg, res) {
        var singleItem = items.filter(function(item) {
            return item.id == itemArg;
        });
        if (singleItem.length) {
            return res.status(200).send({
                data: singleItem[0]
            });
        }
        return res.status(404).send({});
    },

    search: function(items, req, res, exactMatch=false, prefixMatch = false) {
        filteredItems = items;
        filters = getFilters(items, req, res);
        _.each(filters, function(value, key) {
            if (exactMatch) {
                filteredItems = _.filter(filteredItems, function(item) {
                    return (getSanitizedValue(item[key]) === getSanitizedValue(value));
                });
            } else if (prefixMatch) {
                filteredItems = _.filter(filteredItems, function(item) {
                    return getSanitizedValue(item[key]).indexOf(getSanitizedValue(value)) === 0;
                });
            } else {
                filteredItems = _.filter(filteredItems, function(item) {
                    return getSanitizedValue(item[key]).indexOf(getSanitizedValue(value)) > -1;
                });
            }
        });
        return filteredItems;
    }
};

function getFilters(items, req, res) {
    allowedKeys = _.keys(items[0]);
    excludedQueryParams = ['page'];
    filters = {};
    _.each(req.query, function(value, key) {
        if (_.indexOf(excludedQueryParams, key) > -1) {
            //nothing to be done
        } else if (_.indexOf(allowedKeys, key) > -1) {
            filters[key] = value;
        }
    });
    return filters;
}

function getSanitizedValue(val) {
    if (["number", "boolean"].indexOf(typeof(val)) !== -1) {
        return val.toString();
    }

    return val.toLowerCase();
}
