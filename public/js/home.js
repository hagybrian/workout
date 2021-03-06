$(document).ready(function() {
    // Getting references to the name inout and workout container, as well as the table body
    var nameInput = $("#workout-name");
    var workoutList = $("tbody");
    var workoutContainer = $(".workout-container");

    $(document).on("submit", "#workout-form", handleworkoutFormSubmit);
    $(document).on("add", "#workout-form", handleworkoutFormAdd);
    // $(document).on("click", ".delete-workout", handleDeleteButtonPress);

    // Getting the intiial list of workouts
    getworkouts();

    // A function to handle what happens when the form is submitted to create a new workout
    function handleworkoutFormSubmit(event) {
        event.preventDefault();
        // Don't do anything if the name fields hasn't been filled out
        if (!nameInput.val().trim().trim()) {
            return;
        }
        // Calling the upsertworkout function and passing in the value of the name input
        upsertworkout({
            name: nameInput
                .val()
                .trim()
        });
    }

    // A function to handle what happens when the form is submitted to create a new workout and add another workout
    function handleworkoutFormAdd(event) {
        event.preventDefault();
        // Don't do anything if the name fields hasn't been filled out
        if (!nameInput.val().trim().trim()) {
            return;
        }
        // Calling the upsertworkout function and passing in the value of the name input
        upsertworkout({
            name: nameInput
                .val()
                .trim()
        });
    }

    // A function for creating an workout. Calls getworkouts upon completion
    function upsertworkout(workoutData) {
        $.post("/api/workouts", workoutData)
            .then(getworkouts);
    }

    // Function for creating a new list row for workouts
    function createworkoutRow(workoutData) {
        var newTr = $("<tr>");
        newTr.data("workout", workoutData);
        newTr.append("<td><a href='/workout?workout_id=" + workoutData.id + "'>" + workoutData.name + "</a></td>");
        newTr.append("<td> " + workoutData.Posts.length + "</td>");
        // newTr.append("<td><a href='/workout?workout_id=" + workoutData.id + "'>" + workoutData.name + "</a></td>");
        newTr.append("<td><a href='/addexercise?workout_id=" + workoutData.id + "'>START</a></td>");
        return newTr;
    }

    // Function for retrieving workouts and getting them ready to be rendered to the page
    function getworkouts() {
        $.get("/api/workouts", function(data) {
            var rowsToAdd = [];
            for (var i = 0; i < data.length; i++) {
                rowsToAdd.push(createworkoutRow(data[i]));
            }
            renderworkoutList(rowsToAdd);
            nameInput.val("");
        });
    }

    // A function for rendering the list of workouts to the page
    function renderworkoutList(rows) {
        workoutList.children().not(":last").remove();
        workoutContainer.children(".alert").remove();
        if (rows.length) {
            workoutList.prepend(rows);
        } else {
            renderEmpty();
        }
    }

    // Function for handling what to render when there are no workouts
    function renderEmpty() {
        var alertDiv = $("<div>");
        alertDiv.addClass("alert alert-danger");
        alertDiv.text("You must create an workout before you can create an exercise.");
        workoutContainer.append(alertDiv);
    }
});