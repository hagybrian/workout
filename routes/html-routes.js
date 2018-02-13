// Dependencies
var path = require("path");

// Routes
module.exports = function(app) {
  // index route loads index.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // cms route loads cms.html
  app.get("/cms", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/cms.html"));
  });

  // workouts route loads workouts.html
  app.get("/workout", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/workouts.html"));
  });

  // workouts route loads workout-manager.html
  app.get("/workouts", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/workouts-manager.html"));
  });

  // workouts route loads workout-manager.html
  app.get("/data", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/data.html"));
  });

};
