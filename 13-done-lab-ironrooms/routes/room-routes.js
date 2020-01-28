const express = require('express');
const router  = express.Router();

const Room = require('../models/room-model');
// const User = require('../models/user-model');

const fileUploader = require('../config/upload-setup/cloudinary');


// GET route to display the form to create a room
router.get('/rooms/add', isLoggedIn, (req, res, next) => {
  res.render('room-pages/add-room');
});



// POST route to create the room -> has the image uploading example 🥳

                    //  <input type="file" name="imageUrl" id="">
//                                                  |
router.post('/create-room', fileUploader.single('imageUrl'),(req, res, next) => {
  // console.log('body: ', req.body);
  // console.log(' - - -- - -- - -- - - -- - - ');
  // console.log('file: ', req.file);
  const { name, description } = req.body;
  Room.create({
    name,
    description,
    imageUrl: req.file.secure_url,
    owner: req.user._id
  })
  .then( newRoom => {
    // console.log('room created: ', newRoom)
    res.redirect('/rooms');
  } )
  .catch( err => next(err) )
})

// show all the rooms
router.get('/rooms', (req, res, next) => {
  // in the Room model, property 'owner' is referencing the User model 
  // so in the database collection 'rooms' one instance will have mongodb id saved into this property ----
  // _id:ObjectId("5c5f464c8f4c3ae21c6dfba9")                                                            |
  // name:"studio"                                                                                       |
  // description:"cool palce for young"                                                                  |
  // imageUrl:"https://res.cloudinary.com/djw7xkbip/image/upload/v1549747137/rooms-ga..."                |
  // owner:ObjectId("5c5f461e8f4c3ae21c6dfba8") <====== !!! <---------------------------------------------
  //   |
  //   -------------------
  //                     |
  Room.find().populate('owner')
  .then(roomsFromDB => {
    roomsFromDB.forEach(oneRoom => {
      // each room has the 'owner' property which is user's id
      // if owner (the id of the user who created a room) is the same as the currently logged in user
      // then create additional property in the oneRoom object (maybe isOwner is not the best one but ... 🤯)
      // and that will help you to allow that currently logged in user can edit and delete only the rooms they created
      
      // if there's a user in a session:
      if(req.user){
        if(oneRoom.owner.equals(req.user._id)){
          oneRoom.isOwner = true;
        }
      }
    })
    res.render('room-pages/room-list', { roomsFromDB })
  })
  .catch( err => next(err) )
})

// get the details of a specific room
router.get('/rooms/:roomId',isLoggedIn, (req, res, next) => {

  // here we need to populate owner field but as well
  Room.findById(req.params.roomId).populate('owner')
  // 🎯🎯🎯 we need to populate 'reviews' field and the 'user' field that's inside the reviews 🎯🎯🎯
  .populate({path: 'reviews', populate: {path:'user'}})
  .then(foundRoom => {

    // console.log(' == = = = == = == = ', foundRoom);
    if(foundRoom.owner.equals(req.user._id)){
      foundRoom.isOwner = true;
    }
    
    // go through all the reviews and check which ones are created by currently logged in user
    Promise.all(foundRoom.reviews.filter(singleReview => {                      //          |
      if(singleReview.user._id.equals(req.user._id)){   // <--------------------------------|
        // and if that's the case, create new property in the each review that satisfies criteria
        // and use this property when looping through the array of reviews in hbs file to make sure
        // that logged in user can only edit and delete the reviews they created 
        singleReview.canBeChanged = true;
      }
      return singleReview;
    }))
    .then(() => {
      res.render('room-pages/room-details', { room: foundRoom } )
    })
    .catch( err => next(err) )
  })
  .catch( err => next(err) )
})

// post => save updates in the specific room
router.post('/rooms/:roomId/update', fileUploader.single('imageUrl'),(req, res, next) => {

  const { name, description } = req.body;
  // we use ES6 destructuring and if not, we would have to do this -> const name = req.body.name; and const description = req.body.description;

  const updatedRoom = { // <---------------------------------------
    name,                                                         //  |
    description,                                                  //  |
    owner: req.user._id	                                          //  |
  }                                                               //  |
  // if the user changed the picture, 'req.file' will exist       //  |
  // and then we create additional property updatedRoom.imageUrl  //  |
  // inside 'updatedRoom' object                                  //  |                 
  if(req.file){                                                   //  |
    updatedRoom.imageUrl = req.file.secure_url;                   //  |
  }                                                               //  |
                                                                  //  |
  Room.findByIdAndUpdate(req.params.roomId, updatedRoom) // <----------
  .then( theUpdatedRoom => {
    // console.log(theUpdatedRoom);
    res.redirect(`/rooms/${updatedRoom._id}`);
  } )
  .catch( err => next(err) )
})

// delete a specific room
router.post('/rooms/:id/delete', (req, res, next) => {
  Room.findByIdAndDelete(req.params.id)
  .then(() => {
    res.redirect('/rooms');
  })
  .catch(err => next(err));
})


// this is the function we use to make sure the route and the functionality is 
// available only if we have user in the session
function isLoggedIn(req, res, next){
  if(req.user){
    next();
  } else  {
    req.flash('error', 'You need to log in in order to access the page.')
    res.redirect('/login');
  }

}

module.exports = router;
