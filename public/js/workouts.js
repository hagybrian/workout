$(document).ready(function() {
    /* global moment */

    // workoutsContainer holds all of our posts
    var workoutsContainer = $(".workouts-container");
    var postCategorySelect = $("#category");
    // Click events for the edit and delete buttons
    $(document).on("click", "button.delete", handlePostDelete);
    $(document).on("click", "button.edit", handlePostEdit);
    // Variable to hold our posts
    var posts;

    // The code below handles the case where we want to get workouts posts for a specific workout
    // Looks for a query param in the url for workout_id
    var url = window.location.search;
    var workoutId;
    if (url.indexOf("?workout_id=") !== -1) {
        workoutId = url.split("=")[1];
        getPosts(workoutId);
    }
    // If there's no workoutId we just get all posts as usual
    else {
        getPosts();
    }


    // This function grabs posts from the database and updates the view
    function getPosts(workout) {
        workoutId = workout || "";
        if (workoutId) {
            workoutId = "/?workout_id=" + workoutId;
        }
        $.get("/api/posts" + workoutId, function(data) {
            console.log("Posts", data);
            posts = data;
            if (!posts || !posts.length) {
                displayEmpty(workout);
            } else {
                initializeRows();
            }
        });
    }

    // This function does an API call to delete posts
    function deletePost(id) {
        $.ajax({
                method: "DELETE",
                url: "/api/posts/" + id
            })
            .done(function() {
                getPosts(postCategorySelect.val());
            });
    }

    // InitializeRows handles appending all of our constructed post HTML inside workoutsContainer
    function initializeRows() {
        workoutsContainer.empty();
        var postsToAdd = [];
        for (var i = 0; i < posts.length; i++) {
            postsToAdd.push(createNewRow(posts[i]));
        }
        workoutsContainer.append(postsToAdd);
    }

    // This function constructs a post's HTML
    function createNewRow(post) {
        var formattedDate = $(post.createdAt);
        formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
        var newPostPanel = $("<div>");
        newPostPanel.addClass("panel panel-default container-workout");
        var newPostPanelHeading = $("<div>");
        newPostPanelHeading.addClass("panel-heading");
        var deleteBtn = $("<button>");
        deleteBtn.text("x");
        deleteBtn.addClass("delete btn btn-danger");
        var editBtn = $("<button>");
        editBtn.text("EDIT");
        editBtn.addClass("edit btn btn-info");
        var newPostSequence = $("<h2>");
        var newPostDate = $("<small>");
        var newPostworkout = $("<h5>");
        newPostworkout.text(post.workout.name);
        var newPostexercise = $("<h2>");
        newPostexercise.text(post.exercise);
        console.log(post.exercise);
        var newPostPanelBody = $("<div>");
        newPostPanelBody.addClass("panel-body");
        var newPostBody = $("<p>");
        newPostSequence.text(post.sequence + " - " + post.exercise);
        newPostBody.text(post.body);

        var newPostSets = $("<th>");
        newPostSets.addClass("workout-table");

        newPostSets.text("Sets: " + post.sets);



        var newPostWeight = $("<th>");
        newPostWeight.addClass("workout-table");
        newPostWeight.text("Weight: " + post.weight);

        var newPostReps = $("<th>");
        newPostReps.addClass("workout-table");
        newPostReps.text("Reps: " + post.reps);

        var newPostTempo = $("<th>");
        newPostTempo.addClass("workout-table");
        newPostTempo.text("Tempo: " + post.tempo);

        var newPostRest = $("<th>");
        newPostRest.addClass("workout-table");
        newPostRest.text("Rest: " + post.rest);

        var newPostTimer = $("<div>");
        newPostTimer.addClass("timer");


        // newPostDate.text(formattedDate);
        // newPostSequence.append(newPostDate);
        newPostPanelHeading.append(deleteBtn);
        newPostPanelHeading.append(editBtn);
        newPostPanelHeading.append(newPostworkout);
        newPostPanelHeading.append(newPostSequence);
        // newPostPanelHeading.append(newPostexercise);

        newPostPanelBody.append(newPostBody);
        newPostPanel.append(newPostPanelHeading);
        newPostPanel.append(newPostPanelBody);
        newPostPanel.data("post", post);
        newPostPanelBody.append(newPostSets);
        newPostPanelBody.append(newPostWeight);
        newPostPanelBody.append(newPostReps);
        newPostPanelBody.append(newPostTempo);
        newPostPanelBody.append(newPostRest);
        newPostPanelBody.append(newPostTimer);



        // setsInput.val(data.sets);
        // weightInput.val(data.weight);
        // repsInput.val(data.reps);
        // tempoInput.val(data.tempo);
        // restInput.val(data.rest);

        return newPostPanel;
    }

    // This function figures out which post we want to delete and then calls deletePost
    function handlePostDelete() {
        var currentPost = $(this)
            .parent()
            .parent()
            .data("post");
        deletePost(currentPost.id);
    }

    // This function figures out which post we want to edit and takes it to the appropriate url
    function handlePostEdit() {
        var currentPost = $(this)
            .parent()
            .parent()
            .data("post");
        window.location.href = "/addexercise?post_id=" + currentPost.id;
    }

    // This function displays a messgae when there are no posts
    function displayEmpty(id) {
        var query = window.location.search;
        var partial = "";
        if (id) {
            partial = " for workout #" + id;
        }
        workoutsContainer.empty();
        var messageh2 = $("<h2>");
        messageh2.css({ "text-align": "center", "margin-top": "50px" });
        messageh2.html("No exersizes yet" + partial + ", navigate <a href='/addexercise" + query +
            "'>here</a> in order to get started.");
        workoutsContainer.append(messageh2);
    }

});