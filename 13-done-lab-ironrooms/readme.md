![logo_ironhack_blue 7](https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png)

# Rooms App with Reviews - final practice for project #2

## Introduction

In previous lessons, we covered all the basics one full stack app can have. Now is the time for you to implement all these features one more time.

<!-- ## Requirements -->

<!-- - Fork this repo
- Clone this repo -->

<!-- ## Submission
- Upon completion, run the following commands:

```bash
git add .
git commit -m "done"
git push origin master
```
- Create Pull Request so your TAs can check up your work. -->

## Instructions

The app needs to have users (signup, login, logout functionality) and full CRUD on at least one of the models, but that one model can't be just users (you can have CRUD on users as well, but that can't be the only one). So let's summarize the requirements:
- **Models**: user, room, reviews
- **Routes**: auth, rooms, reviews, users (optional, in case you want to add CRUD on users as well)
- **Views**: all the necessary pages so the users can auth themselves and do the CRUD. For easier navigation through your files and consistent naming please organize all the pages into folders (ex. *auth-views*, *room-views*, *comment-views*, ...)

### Iteration 0 | Create the project

Once more, let's use our friend `ironhack_generator` and create a new app.

```bash
$ irongenerate rooms-app
$ cd rooms-app
$ npm run dev
```

## Iteration #1: The Signup & Login & Logout Features

Our app will have users, and they will use `email` and `password` to authenticate themselves. They will also have to input their full name when signing in. In addition to this way, please feel free to use any  of the social strategies (this is bonus feature).

So your user schema should look somewhat like this:
```js
const userSchema = new Schema({
  email: String,
  password: String,
  fullName: String,
  // slack login - optional
  slackID: String,
  // google login - optional
  googleID: String
}, {
  timestamps: true
});
```

Now create all the routes and views needed to have users successfully signup/login/logout. We suggest using `passport.js` and its local strategy for the mandatory part of this iteration.

💡 Make sure you install all the packages: *bcrypt*, *passport*, *passport-local*, and if you have social login: *passport-google-oauth* and/or *passport-slack*.

**Hint**: You have already everything set up in the previous lessons + class examples, be resourceful 🥳.

## Iteration #2: The CRUD on `room` model

Great, we have users so let's start adding some more functionality to our app.
Our rooms will have following schema: 
```js
const roomSchema = new Schema({
  name: { type: String },
  description: { type: String },
  imageUrl: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  reviews: [] // we will update this field a bit later when we create review model
})
```
Our users can:
- create new rooms only when logged in
- edit and delete the rooms only if they created them (if they are the owners)
- see the list of the rooms even though they are not logged in

Please proceed to creating all the routes and files necessary to display forms and see the results after the submission. 

## Iteration #3: The `review` model and (optional) CRUD on it

Great, you already have fully functioning CRUD app with users but we will go one more step: let's create *reviews section* for each room. 

The review schema can look like this:
```js
const reviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  comment: { type: String,  maxlength: 200 }
})
```
Now we can go ahead and update `reviews` property in the *roomSchema*:
```js
...
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' } ]
...
```
Our users can:
- when logged in, make reviews for all the rooms  but the ones they created
- when logged in, edit and/or delete their comments (optional)
- when logged out, see the rooms and all the comments


Happy coding! :heart:
