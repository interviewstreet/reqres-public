var data = require("./../data.json"),
	config = require("./../config.json"),
    resources_config = require("./../resources_config.json"),
    {returnSingle, returnAll, search} = require("./helper");

module.exports = {

	get: function(req, res, next) {
		var resource = req.params.resource,
			itemArg = req.params[0] || req.query.id || null,
			items;

		if (data[resource]) {
			if (itemArg) {
				items = data[resource];
				return returnSingle(items, itemArg, res);
			}
			if (resource === 'cities') {
				items = search(data[resource], req, res, false, true);
			} else {
				items = search(data[resource], req, res, true);
			}
			return returnAll(items, req, res, (resources_config[resource] || {}));
		} else {
			return res.status(400).send({ error: "Unknown resource" });
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
			items = search(data[resource], req, res, false);
			return returnAll(items, req, res, (resources_config[resource] || {}));
		} else {
			return res.status(400).send({
				error: "Unknown resource"
			});
		}
	}

};
