/**
 * Created by ming on 5/5/2016.
 */
var express = require('express');
var app = express();

app.get('/', function(req, res){
    var body = "<h2>Your Request</h2>";
    body += "URL:\t       " + req.originalUrl + "<br>";
    body += "Protocol:  " + req.protocol + "<br>";
    body += "IP:        " + req.ip + "<br>";
    body += "Path:      " + req.path + "<br>";
    body += "Host:      " + req.hostname + "<br>";
    body += "Method:    " + req.method + "<br>";
    body += "Query:     " + JSON.stringify(req.query) + "<br>";
    body += "Secure:    " + req.secure + "<br>";
    body += "UTF8:      " + req.acceptsCharsets('utf8') + "<br>";
    body += "Connection: " + req.get('connection') + "<br>";
    body += "Headers: " + JSON.stringify(req.headers) + "<br>";
    res.status(200).send(body);
});

app.listen(3000, () => {
    console.log('Express server listening on port 3000!');
});