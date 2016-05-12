/**
 * Created by ming on 5/5/2016.
 */
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send("Get Index");
});

app.get('/authors', function (req, res) {
    res.send("Get Authors");
});

// http://localhost:3000/book/10:12
app.get(/^\/book\/(\w+)\:(\w+)?$/, function(req, res){
    var response = 'Get Book: <br>Chapter: ' + req.params[0] +
        '<br>Page: ' + req.params[1];
    res.send(response);
});

app.param('userid', function(req, res, next, value){
    console.log("\nRequest received with userid: " + value);
    next();
});

// http://localhost:3000/user/123
app.get('/user/:userid', function (req, res) {
    //var response = 'Get body: ' + JSON.stringify(req.body) + "<br>";
    //response += 'Get params: ' + JSON.stringify(req.params) + "<br>";
    //response += 'Get query: ' + JSON.stringify(req.query) + "<br>";
    var response = 'Get User: ' + req.params['userid'];
    res.send(response);
});

app.listen(3000, () => {
    console.log('Express server listening on port 3000!');
});