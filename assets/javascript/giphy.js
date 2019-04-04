$(document).ready(function() {

    // store personal GIPHY API key
    var apikey = "NEv5getU1GA0PnNdgDWvDcvjIV3uKIE9";

    // create array of starting topics : TV Characters
    var topics = ["Michael Scott", "Jim Halpert", "Dwight Schrute", "Andy Bernard", "Leslie Knope", "Ann Perkins", "Ron Swanson",
                "Tom Haverford", "Chris Traeger", "Andy Dwyer", "Homer Simpson", "Bart Simpson", "Monty Burns", "Ralph Wiggum"];

    // create function to put topic buttons into div with id="buttons"...
    function placeButtons() {
        // remove buttons from DOM
        $("#buttons").empty();

        // add a new button for each string in topics array
        for (var i = 0; i < topics.length; i++) {
            var newButton = $("<button id='topic-button'>" + topics[i] + "</button>");
            $("#buttons").append(newButton);  
        }
    }

    //.. and call it
    placeButtons();

    // when the user clicks one of the available buttons..
    $(document).on("click", "#topic-button", function() {
        
        // store text from button locally
        var searchTerm = $(this).text();

        // store queryURL locally
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                        searchTerm + "&limit=10&apikey=" + apikey;

        // use ajax to access API and work with response
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

            console.log(response);

            // store data array
            var data = response.data;

            // make div to prepend to DOM later, and give if id of "gif-bundle"
            var gifDiv = $("<div>");
            gifDiv.attr("id", "gif-bundle");

            // for each item in data...
            for (var i = 0; i < data.length; i++) {
                // make a new div with id "gif-single"
                var gif = $("<div>");
                gif.attr("id", "gif-single");

                // make img element and append to gif
                var gifImg = $("<img>");
                gifImg
                    .attr("class", "gif")
                    .attr("src", data[i].images.original_still.url)
                    .attr("data-live", data[i].images.original.url)
                    .attr("data-still", data[i].images.original_still.url)
                    .attr("data-state", "still")
                    .attr("alt", searchTerm + "-gif-" + i);
                gif.append(gifImg);
                
                // make p element with rating in it and append
                gif.append("<p>Rating: " + data[i].rating + "</p>");

                // append gif to gifDiv
                gifDiv.append(gif);
            }

            // prepend gifDiv to DOM
            $("#gifs-go-here").prepend(gifDiv);

        });

    });

    // when the user presses an individual gif
    // why doesnt js like $(".gif").on("click", function() {}) ?
    $(document).on("click", ".gif", function () {
        // locally store the current img
        var curImg = $(this);
        
        // if the gif src is the still image..
        if (curImg.attr("data-state") == "still") {
            // set src to the live gif
            curImg.attr("src", curImg.attr("data-live"));
            curImg.attr("data-state", "live");
        }
        
        // otherwise, the gif src is the live gif
        else {
            // so change it to the still image
            curImg.attr("src", curImg.attr("data-still"));
            curImg.attr("data-state", "still");
        }

    });

    // When user presses the submit button
    $(document).on("click", "#new-character", function() {
        // locally store what they pressed
        var newChar = $("#add-character").val();

        // if newChar is not empty string, and if topics doesn't contain newChar
        if((newChar != "") && !(topics.includes(newChar))) {
            // add newChar to end of topics array
            topics.push(newChar);

            // re-place buttons
            placeButtons();
        }

    });


});