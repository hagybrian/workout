$(document).ready(function() {
    // Getting jQuery references to the post body, title, form, and workout select
    var bodyInput = $("#body");
    var titleInput = $("#title");
    var sectionInput = $("#section");
    var sequenceInput = $("#sequence");
    var exerciseInput = $("#exercise");
    var setsInput = $("#sets");
    var weightInput = $("#weight");
    var repsInput = $("#reps");
    var tempoInput = $("#tempo");
    var restInput = $("#rest");
    var addexerciseForm = $("#addexercise");
    var workoutselect = $("#workout");
    // Adding an event listener for when the form is submitted
    $(addexerciseForm).on("submit", handleFormSubmit);
    // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
    var url = window.location.search;
    var postId;
    var workoutId;
    // Sets a flag for whether or not we're updating a post to be false initially
    var updating = false;

    // If we have this section in our url, we pull out the post id from the url
    // In '?post_id=1', postId is 1
    if (url.indexOf("?post_id=") !== -1) {
        postId = url.split("=")[1];
        getPostData(postId, "post");
    }
    // Otherwise if we have an workout_id in our url, preset the workout select box to be our workout
    else if (url.indexOf("?workout_id=") !== -1) {
        workoutId = url.split("=")[1];
    }

    // Getting the workouts, and their posts
    getworkouts();

    // A function for handling what happens when the form to create a new post is submitted
    function handleFormSubmit(event) {
        event.preventDefault();
        // Wont submit the post if we are missing a body, title, or workout
        if (!sequenceInput.val().trim() || !exerciseInput.val().trim() || !setsInput.val().trim() || !weightInput.val().trim() || !repsInput.val().trim() || !tempoInput.val().trim() || !restInput.val().trim() || !workoutselect.val()) {
            return;
        }
        // Constructing a newPost object to hand to the database
        var newPost = {
            section: sectionInput
                .val()
                .trim(),
            sequence: sequenceInput
                .val()
                .trim(),
            exercise: exerciseInput
                .val()
                .trim(),
            sets: setsInput
                .val()
                .trim(),
            weight: weightInput
                .val()
                .trim(),
            reps: repsInput
                .val()
                .trim(),
            tempo: tempoInput
                .val()
                .trim(),
            rest: restInput
                .val()
                .trim(),
            workoutId: workoutselect.val()
        };

        // If we're updating a post run updatePost to update a post
        // Otherwise run submitPost to create a whole new post
        if (updating) {
            newPost.id = postId;
            updatePost(newPost);
        } else {
            submitPost(newPost);
        }
    }

    // Submits a new post and brings user to workouts page upon completion
    function submitPost(post) {
        $.post("/api/posts", post, function() {
            window.location.href = "/workouts";
        });
    }

    // Gets post data for the current post if we're editing, or if we're adding to an workout's existing posts
    function getPostData(id, type) {
        var queryUrl;
        switch (type) {
            case "post":
                queryUrl = "/api/posts/" + id;
                break;
            case "workout":
                queryUrl = "/api/workouts/" + id;
                break;
            default:
                return;
        }
        $.get(queryUrl, function(data) {
            if (data) {
                // If this post exists, prefill our cms forms with its data
                // titleInput.val(data.title);
                // bodyInput.val(data.body);
                sectionInput.val(data.section);
                sequenceInput.val(data.sequence);
                exerciseInput.val(data.exercise);
                setsInput.val(data.sets);
                weightInput.val(data.weight);
                repsInput.val(data.reps);
                tempoInput.val(data.tempo);
                restInput.val(data.rest);
                workoutId = data.workoutId || data.id;
                // If we have a post with this id, set a flag for us to know to update the post
                // when we hit submit
                updating = true;
            }
        });
    }

    // A function to get workouts and then render our list of workouts
    function getworkouts() {
        $.get("/api/workouts", renderworkoutList);
    }
    // Function to either render a list of workouts, or if there are none, direct the user to the page
    // to create an workout first
    function renderworkoutList(data) {
        if (!data.length) {
            window.location.href = "/workouts";
        }
        $(".hidden").removeClass("hidden");
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
            rowsToAdd.push(createworkoutRow(data[i]));
        }
        workoutselect.empty();
        console.log(rowsToAdd);
        console.log(workoutselect);
        workoutselect.append(rowsToAdd);
        workoutselect.val(workoutId);
    }

    // Creates the workout options in the dropdown
    function createworkoutRow(workout) {
        var listOption = $("<option>");
        listOption.attr("value", workout.id);
        listOption.text(workout.name);
        return listOption;
    }

    // Update a given post, bring user to the workouts page when done
    function updatePost(post) {
        $.ajax({
                method: "PUT",
                url: "/api/posts",
                data: post
            })
            .done(function() {
                window.location.href = "/workouts";
            });
    }
});