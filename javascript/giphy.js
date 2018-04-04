
  
  var topics = ["bob dylan", "david bowie", "morrissey", "sleater kinney", "billie holiday", "gogol bordello", "johnny cash", "bob marley", "bright eyes", "decemberists", "the cranberries", "pixies"];

  console.log()
  function displayMyBands() {
    var band = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + band + "&api_key=ZBSYr8xCZOr5rj7fsdmlEFHM9KCEaEKo&tag=music&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    for (var i = 0; i < topics.length; i++) {
      // Then dynamicaly generating buttons for each band in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of band-btn to our button
      a.addClass("band-btn");
      // Adding a data-attribute
      a.attr("data-name", topics[i]);
      // Providing the initial button text
      a.text(topics[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
    });
  }

  function displayGiphys () {
      event.preventDefault();
      var band = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + band + "&api_key=ZBSYr8xCZOr5rj7fsdmlEFHM9KCEaEKo&tag=music&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(queryURL);
        console.log(response);
        var results = response.data;
        for (var p = 0; p < results.length; p++) {
          if (results[p].rating !== "r" && results[p].rating !== "pg-13") {
            var mygiphys = $("<div>");
            mygiphys.addClass("mygiphys");
            $("#bands-view").append(mygiphys);
            var rating = results[p].rating;
            var showRating = $("<p>").text("Rating: " + rating);
            var stillGifURL = results[p].images.original_still.url;
            var moveGifURL = results[p].images.original.url;
            var bandImages = $("<img class = 'gif' src = '' data-still = '' data-animate = '' data-state = 'still'>");
            bandImages.attr("src", stillGifURL);
            bandImages.attr("data-still", stillGifURL);
            bandImages.attr("data-animate", moveGifURL);
            mygiphys.prepend(bandImages);
            $("#bands-view").prepend(mygiphys);    
            mygiphys.prepend(showRating);
          }      
        }
    })
  }  

  $(document).on("click", ".gif", function() {
    var clickImate = $(this).attr("data-state");
    if (clickImate === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-band").on("click", function(event) {
    event.preventDefault();
    var band = $("#band-input").val().trim().toLowerCase();
        // console.log("This is the band you just entered " + band);
        var noAddBand = jQuery.inArray(band,topics);
        if (noAddBand === -1) {
            topics.push(band);
            var b = $("<button>");
    // Adding a class of band-btn to our button
            b.addClass("band-btn");
    // Adding a data-attribute
            b.attr("data-name", band);
    // Providing the initial button text
            b.text(band);
    // Adding the button to the buttons-view div
            $("#buttons-view").append(b);
            displayGiphys();

            console.log("This is the bands array: " + topics);
        }   
        else {
            alert("Enter a different musician, that one is already in the mix!");
        }
        $("#band-input").val("");
        console.log("Index : " + jQuery.inArray(band, topics));    
    }); 


  $(document).on("click", ".band-btn", displayGiphys);

  // Calling the displayMyBands to display the buttons
  displayMyBands();
