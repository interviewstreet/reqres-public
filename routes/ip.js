var _ = require("lodash");
var {get} = require("./index");
var data = require("./../data.json");

module.exports = {
    get: function(req, res, next) {
    	var ip = _.find(data.ip, function(ip_info) {
    		return ip_info.ip == req.params.ip
    	});

    	if (ip) {
			return res.status(200).send({data: ip});
    	} else {
    		return res.status(404).send({});
    	}
    }
};
