var keys = require ('./keys.js');
var request = require('request');
var spotifyData = require('spotify');
var omdb = require('omdb');
var command = process.argv[2];
var value = process.argv[3];
var limit = 5;

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
	    console.log('I found this many songs:\n');
	    for (var i = 0; i < limit; i++) {
	    	// console.log(data.tracks.items[i]);
	    	console.log('Song ' + (i+1) + ':')
	    	console.log('Artist: ' + data.tracks.items[i].artists[0].name);
	    	console.log('Song Name: ' + data.tracks.items[i].name);
	    	console.log('Album Name: ' + data.tracks.items[i].album.name);
	    	console.log('PReview Link: ' + data.tracks.items[i].preview_url);
	    	console.log('-------------------------')
	    }
	});
	return;
}//End Spotify function

//Will access the imdb API and willl show
//Title, year, rating, Country, Language, plot, Actors, Rotten Tomatos rating and URL
//by Defaut 'Mr. Nobody'
function movieInfo(){
	var movieDefault = 'Mr. Nobody';
	//Evaluation of user input, if undefined we assign a default song
	if(value == undefined){
		movieName = movieDefault;
	}
	else{
		movieName = value;
	}
	//Call the RPM funtion to search the song 
	omdb.get(movieName, {tomatoes: true}, function(err, movies) {
	    if(err) {
	        return console.error(err);
	    }
	    if(movies.length < 1) {
	        return console.log('No movies were found!');
	    }
	    console.log('Check this Movie:');
		console.log('Title of the movie: ' + movies.title );
		console.log('Year the movie came out: ' + movies.year );
		console.log('IMDB Rating of the movie: ' + movies.imdb.rating);
		console.log('Country where the movie was produced: ' + movies.countries);
		//not included in the RPM
		console.log('Language of the movie: ' + movies.languages );
		console.log('Plot of the movie: ' + movies.plot );
		console.log('Actors in the movie: ' + movies.actors );
		console.log('Rotten Tomatoes Rating: ' + movies.tomato.rating );
		console.log('Rotten Tomatoes URL: ' + movies.tomato.url);
	    console.log('-------------------------')

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
		movieInfo();
		break;
	case 'do-what-it-says':
		doWhatItSays();
		break;
}

