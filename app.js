var routes = require("./routes/"),
    datetime = require("./routes/datetime"),
    football = require("./routes/football"),
	express = require("express"),
	bodyParser = require("body-parser"),
	hbs = require("hbs"),
	path = require("path"),
	cors = require("cors"),
	app = express(),
	port = process.env.PORT || 5000;

var getRandomInteger = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(bodyParser.json());

app.use(cors());

app.set("views", __dirname + "/views");
app.set("view engine", "html");
app.set("view options", { layout: "layout.html" });
app.engine("html", hbs.__express);
app.use(express.static(path.join(__dirname, "public")));

app.all("/api/*", [bodyParser(),
	function(req, res, next) {
		if (req.query && req.query.delay) {
			var delay = req.query.delay;
			if(delay === 'random'){
				var random = getRandomInteger(200, 3000);
				return setTimeout(next, random);
			}
			if(isNaN(delay)){
				return next();
			}
			return setTimeout(next, req.query.delay * 1000);
		}
		return next();
	}
]);

// app.get("/", function(req, res, next) {
// 	res.render("index");
// });

// app.post("/api/login", routes.login);
// app.post("/api/login/", routes.login);

// app.post("/api/register", routes.register);
// app.post("/api/register/", routes.register);

// app.post("/api/logout", routes.logout);
// app.post("/api/logout/", routes.logout);

app.get("/api/football/:resource/", football.get);
app.get("/api/football/:resource/*", football.get);

app.get("/api/:resource/search", routes.search);
app.get("/api/:resource/search/*", routes.search);

app.get("/api/:resource/*", routes.get);
app.get("/api/:resource", routes.get);

app.get("/datetime", datetime.get);
// app.post("/api/:resource/*", routes.post);
// app.post("/api/:resource", routes.post);

// app.put("/api/:resource/*", routes.put);
// app.put("/api/:resource", routes.put);

// app.patch("/api/:resource/*", routes.patch);
// app.patch("/api/:resource", routes.patch);

// app.delete("/api/:resource/*", routes.delete);
// app.delete("/api/:resource", routes.delete);

app.use(function(req, res, next) {
	res.status(404);

	if (req.accepts("html")) {
		res.render("404", {
			url: req.url
		});
		return;
	}

	res.type("txt").send("Not found");
});

var server = app.listen(port, function() {

	var host = server.address().address,
		port = server.address().port;

	console.log("Example app listening at http://%s:%s", host, port);

});

module.exports = server
