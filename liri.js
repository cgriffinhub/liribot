require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require('moment');
var command = process.argv[2];
var item = process.argv[3];
var spotify = new Spotify(keys.spotify);
var fs = require("fs");


// search function for spotify
if (command ==="spotify-this-song") {
    if (!item) {
        item = "I saw the Sign";
    }
    spotify.search({ type: 'track', query: item })
    .then(function(response) {
        console.log("Artist: "+ response.tracks.items[0].artists[0].name + 
        "\nSong Name: "+ response.tracks.items[0].name + 
        "\nAlbum: "+ response.tracks.items[0].album.name + 
        "\nPreview URL: "+ response.tracks.items[0].preview_url + 
        "\n --------------------------------------------------");
    })
    .catch(function(err) {
      console.log(err);
    });
}

// search function for omdb
if (command === "movie-this") {
    if (!item) {
        item = "Mr. Nobody";
    }
    // Then run a request with axios to the OMDB API with the movie specified
axios.get("http://www.omdbapi.com/?t="+item+"&y=&plot=short&apikey=trilogy").then(
    function(response) {
      console.log("Movie Title: "+response.data.Title + "\n"
      + "Year: "+response.data.Year + "\n"
      + "IMDB Rating: "+response.data.imdbRating + "\n"
      + "Rotten Tomatoes Score: "+response.data.Ratings[2].Value + "\n"
      + "Country "+response.data.Country + "\n"
      + "Plot: "+response.data.Plot + "\n"
      + "Starring: "+response.data.Actors
      + "\n-----------------------------------------------------------------"
      );
    }
  );
}


// search function for bands in town
if (command === "concert-this") {
    if (!item) {
        item = "Pearl Jam";
    }
axios.get("https://rest.bandsintown.com/artists/" + item + "/events?app_id=codingbootcamp").then(
    function(response) {
for (var i = 0; i< response.data.length; i++)
      console.log("Name of Venue: "+response.data[i].venue.name + "\n"     
      + "Venue Location: "+response.data[i].venue.city + ", "+ response.data[i].venue.region+"\n"
      + "Date: "+moment( response.data[i].datetime).format("LLLL")
      + "\n-----------------------------------------------------------------"
      );
    }
  );
}




spotifyFunction = function() {
    spotify.search({ type: 'track', query: item })
    .then(function(response) {
        console.log("Artist: "+ response.tracks.items[0].artists[0].name + 
        "\nSong Name: "+ response.tracks.items[0].name + 
        "\nAlbum: "+ response.tracks.items[0].album.name + 
        "\nPreview URL: "+ response.tracks.items[0].preview_url + 
        "\n --------------------------------------------------");
    })
    .catch(function(err) {
      console.log(err);
    });
}



// read text file and create spotify search
if (command === "do-what-it-says") {
fs.readFile("random.txt", "utf8", function(error, data) {
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
  
    // We will then print the contents of data
    console.log(data);
  
    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");
    command = data[0];
    item = data[1];
    // We will then re-display the content as an array for later use.
    spotifyFunction();
  
  });
}


  