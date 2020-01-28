const express = require('express');

const celebrityRouter = express.Router();

const Celebrity = require('../models/celebrity-model');

// localhost:3000/celebrities/new  => because we prefixed in app.js
celebrityRouter.get('/new', (req, res, next) => {
  // views/celebrities/new-celebrity.hbs => physical path to the file
  // in res.render() we never have '/'
  res.render('celebrities/new-celebrity');
})

// create a post route to pick up all the information from the form to create a new celebrity
{/* <form action="/celebrities" method="POST" > */}

celebrityRouter.post('/', (req, res, next) => {
// <input name="differentNameThanTheOneInModel">
// if we didn't use the same names in the form as the ones we have in our model,
// we would have to do something like this:

  // Celebrity.create({
  //   name: req.body.whatEverNameIsInTheForm,
  //   occupation: req.body.whatEverNameIsInTheForm,
  //   catchPhrase: req.body.whatEverNameIsInTheForm,
  // })

  Celebrity.create(req.body)
  .then( newCelebrity => {
    console.log("New celeb: ", newCelebrity);
  } )
  .catch(err => console.log('Err while creating new celebrity: ', err));
} )

// get all the celebrities from the DB

celebrityRouter.get('/', (req, res, next) => {
  Celebrity.find()
  .then( allCelebrities => {
    // views/celebrities/celebrities.hbs 
    res.render('celebrities/celebrities', { allCelebrities })
  } )
  .catch(err => console.log('Err while getting all celebrities: ', err));
})

module.exports = celebrityRouter;