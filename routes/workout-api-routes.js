var db = require("../models");

module.exports = function(app) {
    app.get("/api/workouts", function(req, res) {
        db.workout.findAll({
            include: [db.Post]
        }).then(function(dbworkout) {
            res.json(dbworkout);
        });
    });

    app.get("/api/workouts/:id", function(req, res) {
        db.workout.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Post]
        }).then(function(dbworkout) {
            res.json(dbworkout);
        });
    });

    app.post("/api/workouts", function(req, res) {
        db.workout.create(req.body).then(function(dbworkout) {
            res.json(dbworkout);
        });
    });

    app.delete("/api/workouts/:id", function(req, res) {
        db.workout.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbworkout) {
            res.json(dbworkout);
        });
    });

};