var express = require('express');
var app = express();
var path = require('path');

// Logger middleware
var myLogger = function (req, res, next) {
    console.log('GET ' + req.path);
    next();
};

app.use(myLogger);

// Serve static directories
app.use('/data', express.static(path.join(__dirname, 'data')));
app.use('/fonts', express.static(path.join(__dirname, 'fonts')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/mp3', express.static(path.join(__dirname, 'mp3')));
app.use('/wav', express.static(path.join(__dirname, 'wav')));

app.get('/style.css', (req, res) => {
    res.type('text/css');
    res.sendFile(path.join(__dirname, 'style.css'));
});

app.get('/pacman-canvas.css', (req, res) => {
    res.type('text/css');
    res.sendFile(path.join(__dirname, 'pacman-canvas.css'));
});

app.get('/pacman-canvas.js', (req, res) => {
    res.type('application/javascript');
    res.sendFile(path.join(__dirname, 'pacman-canvas.js'));
});

app.get('/manifest.json', (req, res) => {
    res.type('application/json');
    res.sendFile(path.join(__dirname, 'manifest.json'));
});

// Serve the main HTML file
app.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, 'index.htm'));
});

// Start the server
var PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log('Server started at http://localhost:' + PORT));