var keys = require ('./keys.js');
var request = require('request');
var command = process.argv[2];
var value = process.argv[3];

// console.log(keys.twitterKeys);
//Will show the last 20 tweets and the date they were created
function myTweets(){
	console.log('This are your last 20 tweets: ');
	return;
}//End myTweets function

//Will access the spotify API and will show:
//Artist, Song Name, PReview Link and the Album
//by Default  the song will be 'The Sign by Aces of base'
function spotify() {
	var songDefault = 'The Sign';
	var artistDefault = 'Aces of base';

	// https://api.spotify.com/v1/search?type=track,artist&market=US&limit=10"
	var song = process.argv[3];

	var spotify = require('spotify');
	 
	spotify.search({ type: 'track', query: songDefault }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	    // console.log('Check it out: ' + data);
	    // console.log(JSON.stringify(data, null, 2));
	    var body = JSON.parse (data);
	    console.log('Check it out: ' + data);
	});
	return;
}//End Spotify function

//Will access the imdb API and willl show
//Title, year, rating, Country, Language, plot, Actors, Rotten Tomatos rating and URL
//by Defaut 'Mr. Nobody'
function movieInfo(){
	var localDefault = 'Mr. Nobody';
	var movieName = process.argv[3];
	console.log('Your Movie info: ')
	var queryUrl = "http://www.omdbapi.com/?t=" + localDefault + "&y=&plot=short&tomatoes=true&r=json";

	// Then create a request to the queryUrl
	// ...
	request(queryUrl, function(error, response, body) {
	    var body = JSON.parse (body);
	    console.log (body)
		console.log('Title of the movie: ' + body.Title );
		console.log('Year the movie came out: ' + body.Year );
		console.log('IMDB Rating of the movie: ' + body.imdbRating );
		console.log('Country where the movie was produced: ' + body.Country );
		console.log('Language of the movie: ' + body.Language );
		console.log('Plot of the movie: ' + body.Plot );
		console.log('Actors in the movie: ' + body.Actors );
		console.log('Rotten Tomatoes Rating: ' + body.tomatoRating );
		console.log('Rotten Tomatoes URL: ' + body.tomatoURL );
	});

}//end Movie Info function

//Will use the fs Node Package and take the text inside to call one of the LIRI's commands
function doWhatItSays(){
	console.log('my text');
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
		movieInfo(value);
		break;
	case 'do-what-it-says':
		doWhatItSays();
		break;
}

