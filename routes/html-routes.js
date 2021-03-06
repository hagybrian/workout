var path = require("path");

var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

    app.get("/", function(req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/home");
        }
        res.sendFile(path.join(__dirname, "../public/signup.html"));
    });

    app.get("/login", function(req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    // If a user who is not logged in tries to access this route they will be redirected to the signup page
    app.get("/members", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/members.html"));
    });

    // index route loads index.html
    app.get("/home", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    // addexercise route loads addexercise.html
    app.get("/addexercise", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/addexercise.html"));
    });

    // workouts route loads workouts.html
    app.get("/workout", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/workouts.html"));
    });

    // workouts route loads workout-manager.html
    app.get("/workouts", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/workouts-manager.html"));
    });

    // workouts route loads workout-manager.html
    app.get("/data", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/data.html"));
    });

};