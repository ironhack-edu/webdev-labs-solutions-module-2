const express = require('express');
const router  = express.Router();
const Room = require('../models/room-model');
const Review = require('../models/review-model');


// create a new review
router.post('/rooms/:roomId/add-review', (req, res, next) => {
  // step 1: create a new review
  const newComment = {
    user: req.user._id,
    comment: req.body.comment,
    canBeChanged: false
  }

  Review.create(newComment)
  .then(theNewComment => {
    // step 2: find the room that the new comment belongs to
    Room.findById(req.params.roomId)
    .then(foundRoom => {
      // when find the room, push the ID of the new comment into the 'reviews' array
      foundRoom.reviews.push(theNewComment._id);
      // step 3: save the changes you just made in the found room
      foundRoom.save()
      .then(() => {
        res.redirect(`/rooms/${foundRoom._id}`)
      })
      .catch(err => next(err));
    })
    .catch(err => next(err));
  })
  .catch(err => next(err));
})


// delete review
// since we have saved reviews inside reviews collection and as array of ids in the rooms' reviews,
// we have to make sure when deleted, the review disappears from the reviews collection and from
// the room's reviews array
router.post('/reviews/:id', (req, res, next) => {
  Review.findByIdAndDelete(req.params.id) // <--- deleting review from reviews collection
  .then(() => {
    Room.findOne({'reviews': req.params.id}) // <--- find a room that has the review we deleted from the collections
    .then(foundRoom => {

      // loop through all the reviews and when find matching ids...
      for(let i=0; i< foundRoom.reviews.length; i++ ){
        console.log(foundRoom.reviews[i]._id.equals(req.params.id))
        if(foundRoom.reviews[i]._id.equals(req.params.id)){
          // ... use method splice to delete that id from the array
          foundRoom.reviews.splice(i, 1);
        }
      }
      // make sure you save the changes in the room (you just deleted one review id from its array of reviews,
      // so that needs to be saved in the database)
      foundRoom.save()
      .then(() => {
        res.redirect(`/rooms/${foundRoom._id}`)
      })
      .catch(err => next(err))
    })
  })
})




module.exports = router;


