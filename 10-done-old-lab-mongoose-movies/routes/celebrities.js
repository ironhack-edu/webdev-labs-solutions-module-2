var express = require('express');
var router = express.Router();

const Celebrity = require('../models/celebrity');

/* GET home page. */
router.get('/celebrities', function(req, res, next) {
  Celebrity.find({}, (err, celebritiesArray) => {
    if (err) { return next(err); }

    res.render('celebrities/index', {
      title: 'Celebrity Inventory',
      celebrities: celebritiesArray
    });
  });
});

router.get('/celebrities/new', function(req, res, next) {
  res.render('celebrities/new', {
    title: "Build Your Celebrity's Profile"
  });

});

router.post('/celebrities', function(req, res, next) {
  const theCelebrity = new Celebrity ({
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  });

  theCelebrity.save ((err) => {
    if (err) {
      res.render('celebrities/new', {
        title: "Build Your Celebrity's Profile"
      });
    }
    else {
      res.redirect('/celebrities');
    }
  })
});

router.get('/celebrities/:id', function (req, res, next) {
  Celebrity.findOne({_id: req.params.id}, (err, theCelebrity) => {
    if (err) { return next(err); }
    res.render('celebrities/show', {
      title: `${theCelebrity.name} Details`,
      celebrity: theCelebrity
    });
  });

});

router.get('/celebrities/:id/edit', function (req, res, next) {
  Celebrity.findOne({ _id: req.params.id }, (err, theCelebrity) => {
    if (err) { return next(err); }

    res.render('celebrities/edit', {
      title: `Edit ${theCelebrity.name}`,
      celebrity: theCelebrity
    });
  });
});

router.post('/celebrities/:id', function (req, res, next) {
  const updatedCelebrity = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  }
  Celebrity.update({_id: req.params.id}, updatedCelebrity, (err, theCelebrity) => {
    if (err) {return next(err); }

    res.redirect('/celebrities');
  });
});

router.post('/celebrities/:id/delete', function(req, res, next) {
  Celebrity.findOne({ _id: req.params.id }, (err, theCelebrity) => {
    if (err) { return next(err); }

    theCelebrity.remove((err) => {
      if (err) { return next(err); }

      res.redirect('/celebrities');
    });
  });
});






module.exports = router;