var db = require("../models");

module.exports = function(app) {
  app.get("/api/workouts", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.workout.findAll({
      include: [db.Post]
    }).then(function(dbworkout) {
      res.json(dbworkout);
    });
  });

  app.get("/api/workouts/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
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
