var {get} = require("./index");

module.exports = {
    get: function(req, res, next) {
        req.params.resource = "football_" + req.params.resource;
        return get(req, res, next);
    }
};