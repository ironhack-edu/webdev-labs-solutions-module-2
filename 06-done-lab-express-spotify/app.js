const express = require('express');
const hbs = require('hbs');

const app =express();

// require spotify-web-api-node npm package since it will give you access to 
// the methods to communicate to the DB that holds the data we need
const SpotifyWebApi = require('spotify-web-api-node');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


// module that loads environment variables from a .env file into process.env 
//         ^
//         |
require('dotenv').config();

// get your credentials from .env file using process.env
// clientId and clientSecret are the variable names we gave in .env file (don't forget to create .env file!!!)
//      |           |
//      --------------------------------------------|
//                                                  |
var clientId = process.env.clientId // <------------|
    clientSecret = process.env.clientSecret // <----|
    access_token = '';

var spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token.
spotifyApi
  .clientCredentialsGrant()
  .then(data => {
    // console.log("data is: ", data)
    spotifyApi.setAccessToken(data.body['access_token']);
  })
  .catch( err => console.log('Something went wrong when retrieving an access token', err));


// Our routes go here:

app.get('/', (req, res, next) => res.render('home'));

app.get('/artists', (req, res, next) => {

    // console.log("req ======= ", req.query);
    // Search artists whose name contains any search term
    spotifyApi
      .searchArtists(req.query.theArtistName) // <----- theArtistName is name="theArtistName" in our search form
      .then(data => {
      // console.log('Search artists by: ====', data.body.artists.items);
        res.render('artists', { allTheArtists: data.body.artists.items });
      })
      .catch(err => console.log("Error while getting the artists: ", err));
});


//                artistId => this is placeholder, can be any word, 
//                            just make sure you use the same word in "req.params.______"
app.get('/albums/:artistId', (req, res, next) => {
    // console.log("Id is: ", req.params);
    spotifyApi
    //               '/albums/:artistId', the second param is optional
    //                            |
    //                            V
    .getArtistAlbums(req.params.artistId, { limit: 5 })
    .then(data => {
      // console.log(" = = == = == = = = =",data.body);
      res.render('albums', { allTheAlbums: data.body.items });
    })
    .catch(err => console.log("Error while getting the albums: ", err));
})


// Get tracks in an album
app.get('/tracks/:albumId', (req, res, next) => { 
  spotifyApi
    .getAlbumTracks(req.params.albumId)
    .then(data => {
      //   console.log("++++++++", data.body);
      res.render('tracks', { tracks: data.body.items });
    })
    .catch(err => console.log("Error while getting the tracks: ", err));
});

app.listen(3000);
