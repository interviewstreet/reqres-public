var data = require("./../data.json"),
	config = require("./../config.json"),
	resources_config = require("./../resources_config.json"),
	_ = require("lodash");

module.exports = {

	get: function(req, res, next) {
		var resource = req.params.resource,
			itemArg = req.params[0] || req.query.id || null,
			items;

		if (data[resource] && !itemArg) {
			return returnAll(data[resource], req, res, (resources_config[resource] || {}));
		} else if (data[resource] && itemArg) {
			items = data[resource];
			return returnSingle(items, itemArg, res);
		} else {
			return res.status(400).send({
				error: "Unknown resource"
			});
		}
	},

	post: function(req, res, next) {
		var id = req.body.id || (Math.ceil(Math.random() * 1000)).toString().substring(0, 3),
			returnData = req.body;
		returnData.id = id;
		returnData.createdAt = new Date().toISOString();

		return res.status(201).send(returnData);
	},

	put: function(req, res, next) {
		var returnData = req.body;
		returnData.updatedAt = new Date().toISOString();
		return res.status(200).send(returnData);
	},

	patch: function(req, res, next) {
		var returnData = req.body;
		returnData.updatedAt = new Date().toISOString();
		return res.status(200).send(returnData);
	},

	delete: function(req, res, next) {
		return res.status(204).send({});
	},

	login: function(req, res, next) {
		if (req.body.username || req.body.email) {
			if (req.body.password) {
				return res.status(200).send({
					token: config.token
				});
			} else {
				return res.status(400).send({
					error: "Missing password"
				});
			}
		} else {
			return res.status(400).send({
				error: "Missing email or username"
			});
		}
	},

	register: function(req, res, next) {
		if (req.body.username || req.body.email) {
			if (req.body.password) {
				return res.status(201).send({
					token: config.token
				});
			} else {
				return res.status(400).send({
					error: "Missing password"
				});
			}
		} else {
			return res.status(400).send({
				error: "Missing email or username"
			});
		}
	},

	logout: function(req, res, next) {
		return res.status(200).send({});
	},

	search: function(req, res, next) {
		var resource = req.params.resource,
			items;

		if (data[resource]) {
			items = search(data[resource], req, res);
			return returnAll(items, req, res, (resources_config[resource] || {}));
		} else {
			return res.status(400).send({
				error: "Unknown resource"
			});
		}
	}

};

function returnAll(items, req, res, options={}) {
	var page = req.query.page || 1,
		offset = (page - 1) * (options.page_size || config.pagination.page_size),
		paginatedItems = _.rest(items, offset).slice(0, (options.page_size || config.pagination.page_size));
	return res.status(200).send({
		page: page,
		per_page: options.page_size || config.pagination.page_size,
		total: items.length,
		total_pages: Math.ceil(items.length / (options.page_size || config.pagination.page_size)),
		data: paginatedItems
	});
}

function returnSingle(items, itemArg, res) {
	var singleItem = items.filter(function(item) {
		return item.id == itemArg;
	});
	if (singleItem.length) {
		return res.status(200).send({
			data: singleItem[0]
		});
	}
	return res.status(404).send({});
}

function search(items, req, res) {
	allowedKeys = _.keys(items[0]);
	excludedQueryParams = ['page'];
	filteredItems = items;
	_.each(req.query, function(value, key) {
		if (_.indexOf(excludedQueryParams, key) > -1) {
			//nothing to be done
		} else if (_.indexOf(allowedKeys, key) > -1) {
			filteredItems = _.filter(filteredItems, function(item) {
				return item[key].toLowerCase().indexOf(value.toLowerCase()) > -1;
			});
		} else {
			filteredItems = [];
		}
	});
	return filteredItems;
}
