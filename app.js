var config = require(__dirname + '/config/config.js');
var express = require('express');
var swig = require('swig');
var app = express();

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(app.router);

// Static
app.use(express.static(__dirname + '/publish'));

// Engine
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Controllers
var user = require(__dirname + '/controllers/login.js');
user.doLoginCtrl(app);

var remoteCamera = require(__dirname + '/controllers/camera.js');
remoteCamera.cameraCtrl(app);

// Routes
var webapp = require(__dirname + '/routes/all.js');
webapp.createRoutes(app);

// Helper
//require(__dirname + '/controllers/helper.js');

app.listen(config.port);
console.log("Server started and listening on port " + config.port);