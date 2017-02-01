//RPM Simplified HTTP request client
var request = require('request');
var fs = require("fs");

//RPM Spotify API library for node.js
var spotifyData = require('spotify');

//RPM Twitter API client library for node.js 
var keys = require ('./keys.js');
var Twitter = require('twitter');
var accountTweets = new Twitter(keys.twitterKeys);

//Global Variables
var command = process.argv[2];
var value = process.argv[3];
var limitSpotify = 5;
var limitTweets = 20;

//Will show the last 20 tweets and the date they were created
function myTweets(){
	var params = {screen_name: 'rvilmars', count: limitTweets};
	accountTweets.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
		console.log('\nThis are your last ' + (tweets.length) + ' tweets: \n');
	  	for(var i = 0 ;  i < tweets.length ; i++){
	  		console.log('Tweet' + (i+1) + ': ');
	    	console.log(tweets[i].text);
	  		console.log('Created on: ' + tweets[i].created_at);
	    	console.log('-------------------------')

	  	}
	  	// console.log(response);
	  }
	});
	return;
}//End myTweets function

//Will access the spotify API and will show:
//Artist, Song Name, Preview Link and the Album
//by Default  the song will be 'The Sign by Aces of base'
function spotify(value) {
	var songDefault = 'The Sign';
	var artistDefault = 'Aces of base';
	//Evaluation of user input, if undefined we assign a default song
	if(value == undefined){
		song = songDefault;
	}
	else{
		song = value;
	}
	//Call the RPM funtion to search the song 
	spotifyData.search({ type: 'track', query: song}, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	    var formatted = JSON.stringify(data, null, 2);
	    console.log('\nI found this many songs:\n');
	    for (var i = 0; i < limitSpotify; i++) {
	    	// console.log(data.tracks.items[i]);
	    	console.log('Song ' + (i+1) + ':')
	    	console.log('Artist: ' + data.tracks.items[i].artists[0].name);
	    	console.log('Song Name: ' + data.tracks.items[i].name);
	    	console.log('Album Name: ' + data.tracks.items[i].album.name);
	    	console.log('Peeview Link: ' + data.tracks.items[i].preview_url);
	    	console.log('-------------------------')
	    }
	});
	return;
}//End Spotify function

//Will access the imdb API and willl show
//Title, year, rating, Country, Language, plot, Actors, Rotten Tomatos rating and URL
//by Defaut 'Mr. Nobody'
function movieInfo(value){
	var movieDefault = 'Mr. Nobody';
	//Evaluation of user input, if undefined we assign a default movie
	if(value == undefined){
		movieName = movieDefault;
	}
	else{
		movieName = value;
	}

	// We run a request to the OMDB API with the movie specified
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&r=json";

	//Create the request
	request(queryUrl, function(error, response, movies) {

		if(!error && response.statusCode === 200){
		   	var movies = JSON.parse (movies);
		    console.log('\nCheck it out:\n');
		    console.log('Title of the movie: ' + movies.Title );
			console.log('Year the movie came out: ' + movies.Year );
			console.log('IMDB Rating of the movie: ' + movies.imdbRating);
			console.log('Country where the movie was produced: ' + movies.Country);
			console.log('Language of the movie: ' + movies.Language);
			console.log('Plot of the movie: ' + movies.Plot);
			console.log('Actors in the movie: ' + movies.Actors );
			console.log('Rotten Tomatoes Rating: ' + movies.tomatoRating );
			console.log('Rotten Tomatoes URL: ' + movies.tomatoURL);
		    console.log('-------------------------');
		}
	});

}//end Movie Info function

//Will use the fs Node Package and take the text inside to call one of the LIRI's commands
function doWhatItSays(){

	fs.readFile("random.txt", "utf8", function(err, data){
		var command = data.split(',');
		
		// var value = command.join("\n");
		switch (command[0]){
			case 'my-tweets':
				myTweets();
				break;
			case 'spotify-this-song':
				spotify(command[1]);
				break;
			case 'movie-this':
				movieInfo(command[1]);
				break;
		}		
		// console.log(command);	
	})
	return;
}

switch (command){
	case 'my-tweets':
		myTweets();
		break;
	case 'spotify-this-song':
		spotify(value);
		break;
	case 'movie-this':
		movieInfo();
		break;
	case 'do-what-it-says':
		doWhatItSays();
		break;
}

