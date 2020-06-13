var geoip = require('geoip-country');

module.exports = {
	get: function(req, res, next) {
		var geo = geoip.lookup(req.params.ip)
		return res.status(200).send({
			ip: req.params.ip,
			country: (geo ? geo.country : null)
		});
	}
}
