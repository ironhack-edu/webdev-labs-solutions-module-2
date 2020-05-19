const express = require("express");
const router = express.Router();
const roles = require('../middlewares/roles');
const User = require('../models/user');
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get("/users", (req, res, next) => {
  if (req.user.role === 'BOSS') req.user.isBoss = true;

  const filter = {};

  if (req.user.role === 'STUDENT') filter.role = 'STUDENT';

  User.find(filter)
    .then(users => {

      users.forEach(user => {
        if (user._id.equals(req.user._id)) {
          user.owned = true;
        }
      });

      res.render("users", { users, currentUser: req.user });
    })
    .catch(error => {
      throw new Error(error);
    });
});

router.get("/user/:id", (req, res, next) => {
  let userId = req.params.id;
  if (!/^[0-9a-fA-F]{24}$/.test(userId)) return res.status(404).send('not-found');
  User.findOne({ _id: userId })
    // .populate("author")
    .then(user => {
      // res.send(user);
      res.render("user-detail", { user, currentUser: req.user });
    })
    .catch(error => {
      throw new Error(error);
    });
});

router.get("/users/add", roles.checkBoss, (req, res, next) => {
    let user = new User();
    user._id = null;
    res.render("user-form", { user, currentUser: req.user });
});
  
router.post("/users/add", (req, res, next) => {
    const {
      username,
      password,
      name,
      description,
      profileImg,
      role
    } = req.body;
  
    if (username == '' || password == '') {
      res.render('user-form', {
        msgError: `username and password can't be empty`
      })
      return;
    }
  
    User.findOne({ "username": username })
    .then(user => {
      if (user !== null) {
        res.render("user-form", {
          msgError: "The username already exists!"
        });
        return;
      }
  
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
  
      const newUser = new User({
        username: username,
        password: hashPass,
        name: name,
        description: description,
        profileImg: profileImg,
        role: role
      });
  
      newUser.save()
      .then(user => {
        res.redirect("/users");
      })
      .catch(err => { throw new Error(err)});
    })
    .catch(err => { throw new Error(err)});
  
});
  
router.get("/users/edit/:id", (req, res, next) => {
    const userId = req.params.id
  
    User.findOne({ _id: userId })
      .then(user => {
        console.log(user)
        if (user._id.equals(req.user._id)) {
          res.render("user-form", { user });
        } else {
          // no access for you!
          res.redirect(`/user/${user._id}`);
        }
        
      })
      .catch(error => {
        throw new Error(error);
      });
});
  
router.post("/users/edit", (req, res, next) => {
    const userId = req.body.userId;
    let { name, profileImg, description, username, password, role } = req.body;
  
    if (password) {
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
  
      password = hashPass;
    }
  
    if (!role) role = 'STUDENT';
  
    User.update(
      { _id: userId },
      { $set: { name, profileImg, description, username, password, role } },
      { new: true } 
    )
      .then(user => {
        res.redirect(`/users`);
      })
      .catch(error => {
        throw new Error(error);
      });
});

router.get("/users/delete/:id", (req, res, next) => {
  let userId = req.params.id;
  if (!/^[0-9a-fA-F]{24}$/.test(userId)) return res.status(404).send('not-found');
  User.findOne({ _id: userId })
    // .populate("author")
    .then(user => {
      res.render("user-delete", { user, currentUser: req.user });
    })
    .catch(error => {
      throw new Error(error);
    });
});

router.post("/users/delete", (req, res, next) => {
  let userId = req.body.id;
  User.deleteOne({ _id: userId })
    .then(user => {
      res.render("user-delete", { message: `user ${user.name} deleted!`, currentUser: req.user });    
    })
    .catch(error => {
      throw new Error(error);
    });
});

module.exports = router;
