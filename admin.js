var express = require("express");
var uuid = require("node-uuid");
var _ = require("lodash");
var rooms = require("./data/rooms.json");

var router = express.Router();
module.exports = router;

router.use(function (req, res, next) {
    if (req.user.admin) {
        next();
        return;
    }
    res.redirect("/login");
});

router.get('/rooms', function (req, res) {
    res.render("rooms", {
        title: "Admin Rooms",
        rooms: rooms
    });
});

router.route('/rooms/add')
    .get( (req, res) => {
        res.render("add");
    })
    .post( (req, res) => {
        var room = {
            name: req.body.name,
            id: uuid.v4()
        };

        rooms.push(room);

        // Redirect to list of rooms
        res.redirect(req.baseUrl + "/rooms");
        //respond with JSON
        //res.json(room);
    });

router.route('/rooms/edit/:id')
    .all((req, res, next) => {
        var roomId = req.params.id;

        var room = _.find(rooms, r => r.id === roomId);
        
        if(!room){
            res.sendStatus(404);
            return;
        }

        res.locals.room = room;
        next();
    })
    .get( (req, res) => {
        res.render("edit");
    })
    .post( (req, res) => {
        res.locals.room.name = req.body.name;

        res.redirect(req.baseUrl + "/rooms");
    });

router.get('/rooms/delete/:id', (req, res) => {
    var roomId = req.params.id;

    rooms = rooms.filter(r => r.id !== roomId);

    res.redirect(req.baseUrl + "/rooms");
});