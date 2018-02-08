// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/workouts.html"));
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

};
