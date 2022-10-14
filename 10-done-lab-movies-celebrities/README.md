![logo_ironhack_blue 7](https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png)

# LAB | Movies and celebrities

<br><br>

## Introduction

<br>

As a summary of our CRUD journey, we will work on creating the app for movies and celebrities.
The goal of this exercise is to practice _CRUD_ on at least one of the models (building the full CRUD for the _movie model_ is mandatory) and _documents relationships_ (between the two models).
So let's see what are some user stories related to the _celebrity_ model:

- The user should be able to:

**1. Add new celebrities**\
**2. See the list of celebrities**

In the second part of the application, when you already have a couple of celebrities in your database, let's figure out what we will do regarding _movie_ model. As we said, we will have a full CRUD on this model, which means the user can:

**3. Add new movies**\
**4. See the list of all movies**\
**5. See the details of a specific movie, including its cast of celebrities**\
**6. Update existing movies**\
**7. Delete movies**

Now that we know the overview of the app, let's proceed to creating it.

_Hint_: Although this lab might seem as overly guided, it is the first time you are creating a full-stack app on your own so we wanted to make sure all steps are covered and you can come back to this lab's solution as a reference at any point later.

Let's go!

## Requirements

- Fork this repo
- Clone this repo

## Submission

- Upon completion, run the following commands:

```
$ git add .
$ git commit -m "done"
$ git push origin master
```

- Create Pull Request so your TAs can check up your work.

<br><br>

## Instructions

<br>

### Iteration 0 | Initialize the project

After forking and cloning the project, you will have to add an `.env` file and add in it the following line:

```
PORT=3000
```

And you have to install all the dependencies:

```bash
$ npm install
```

Run the app and you are ready to start 🚀

<br>

## Iteration #1: Setting the folders/files structure

In order to have everything organized, we will first create a couple of folders and files.

- **Routes**: In our `routes` folder, let's create separate files for our **celebrities** and **movies**. The naming is up to you, but we will use the following: `routes/celebrities.routes.js` and `routes/movies.routes.js`. You can add below starter router code to both of them and remember to link these two new files to either `app.js` or `routes/index.js` so your server has access to them.

```js
// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

module.exports = router;
```

- **Views**: To keep things nice and clean, we will also create separate folders for `celebrities` and `movies`: `views/celebrities` and `views/movies`. Also, we will create a couple of files in each folder:

  - `views/celebrities/celebrities.hbs`
  - `views/celebrities/new-celebrity.hbs`

  - `views/movies/movies.hbs`
  - `views/movies/new-movie.hbs`
  - `views/movies/movie-details.hbs`
  - `views/movies/edit-movie.hbs`

Obviously, naming is the matter of preference so we used very descriptive names for routes and views.

<br>

## Iteration #2: The `Celebrity` model

Our first step is to create the `Celebrity` model and add some celebrities in our database.

The `Celebrity` model should have:

- `name` - String (like _Tom Cruise, Beyonce, Daffy Duck,_ etc.)
- `occupation` - String (what the celebrity does, why they are famous. For example _actor, singer, comedian_, or you can put _unknown_ if your celebrity is someone like Kim Kardashian)
- `catchPhrase` - String (every celebrity needs a good catch phrase. Well maybe not all of them have one in real life, but all of _our_ celebrities will have a catch phrase. This can be pretty much anything.)

Go ahead and locate the `Celebrity.model.js` model file in the `models` folder. Using schema, create the `Celebrity` model with the above mentioned properties. _Don't forget to export the model._ 2. In the `Celebrity.model.js` model file:

<br>

## Iteration #3: Adding New Celebrities

Now that we have defined _Celebrity_ model, let's make it so the user can **add new celebrities to the database**.

<br>

| Route                 | HTTP Verb | Description                                                                                   |
| --------------------- | --------- | --------------------------------------------------------------------------------------------- |
| `/celebrities/create` | GET       | Show a form to create a celebrity                                                             |
| `/celebrities/create` | POST      | Send the data from the form to this route to create the celebrity and save it to the database |

<br>

### Steps we will follow in this iteration:

1. In the routes file (`routes/celebrities.routes.js`) create the following GET route: `/celebrities/create`
2. In that route we have to render the `celebrities/new-celebrity` view
3. In that view file:
   - Add an `<h2>` for the page's heading.
   - Add a `<form>` tag that makes a POST request to `/celebrities/create`.
   - Add `<input>` tags inside the form so the user can fill in values for each attribute of the celebrity. Make an input for `name`, `occupation`, and `catchPhrase`
   - Add a `<button>` tag in the form so the user can submit the form once they are done filling it out.
4. Create the `/celebrities/create` POST route in `routes/celebrities.routes.js`.
5. In that route we have to **create** an instance of the `Celebrity` model (don't forget, we should get all the info from the form through _req.body_)
   - If there is an error, render the `celebrities/new-celebrity` view so the user can try again and
   - If there is no error, redirect to the page with the list of celebrities. This route will be created in the next iteration `/celebrities`
6. In the `views/index.hbs` view file:
   - Add a link that goes to the page you just created with the form to create a new celebrity.

<br>

## Iteration #4: Listing Our Celebrities

Now, when we've got some celebrities in the database, we can start working with them in our Express app. Let's **display a list of all the celebrities**.

Here's the route we will be using:

<br>

| Route          | HTTP Verb | Description          |
| -------------- | --------- | -------------------- |
| `/celebrities` | GET       | Show all celebrities |

<br>

### Steps we will follow in this iteration:

1. Create the `/celebrities` GET route in `routes/celebrities.routes.js`.
2. In the route:
   - Use `find()` method on the `Celebrity` model to retrieve all the celebrities
   - If everything is okay, render the `celebrities/celebrities.hbs` view and pass the array of celebrities into the view as a variable
   - If there's an error, catch it
3. In the `views/celebrities/celebrities.hbs` view file:
   - Add an `<h2>` tag for the page's heading.
   - Use a hbs `#each` loop to display tags with each celebrity's `name`.
4. In the `views/index.hbs` (homepage) file:
   - Add a link that goes to the `/celebrities` route.

<br>

**Celebrities - Done! At least for now.** 😉

<br>

## Iteration #5: The `movie` model

Now when we've started all this good work, let's keep up strong and build all the routes for the _Movie_ model. But first, let's create the _Movie_ model.

The `Movie` model should have:

- `title` - String
- `genre` - String
- `plot` - String
- `cast` - Array of object IDs referencing the _Celebrity_ model (basically, the array of celebrities' IDs)

### Steps we will follow in this iteration:

Go back and review what you did to create the `Celebrity` model. You'll need to create a file for the model, and in that file, you'll need to create a schema for the model as well. Don't forget, you have to export the `Movie` model.

<br>

## Iteration #6: Adding New Movies

Okay, the next step is to make it so the user can **add new movies to the database**.

<br>

| Route            | HTTP Verb | Description                                                                               |
| ---------------- | --------- | ----------------------------------------------------------------------------------------- |
| `/movies/create` | GET       | Show a form to create a movie                                                             |
| `/movies/create` | POST      | Send the data from the form to this route to create the movie and save it to the database |

<br>

### Steps we will follow in this iteration:

Review how you did this for the `Celebrity` model.

- Create 2 new routes, one to render page with the form on it, and one to send the data to after the form is filled out
  - In the GET route that displays the form to create a new movie (which renders the `movies/new-movie.hbs`), make sure you pass all the celebrities from your database so your users can choose which ones are in the cast of the movie you're just creating (**hint**: You will have to use [select multiple](https://www.w3schools.com/tags/att_select_multiple.asp) tag)
- Remember that the user should see the cast name in the option tags, but the information that should be transmitted (`value`) is the `_id` we will use for the `cast` attribute of the movie.
- Make sure the form is making a POST request to the other route you just created (`/movies/create`)
- In your post route, create an object with all the info you just received from the form. (Remember, `req.body`)
- Use this object to create a new movie in the database and redirect back to the page with your list of all movies
- Make sure to add a link to the form on the movies index page so the user can easier navigate

## Iteration #7: Listing Our Movies

Now that we've got some movies in the database, let's make a page where we list all our movies, just like we did with the `Celebrity` model.

Here's the route we will be using:

<br>

| Route     | HTTP Verb | Description     |
| --------- | --------- | --------------- |
| `/movies` | GET       | Show all movies |

<br>

### Steps we will follow in this iteration:

Go back and review how you did this for the `celebrities`. You'll need to:

- Create a GET route that will render the file in which we will display movies (`movies/movies.hbs`)
- Use a database query to retrieve all the movies from your database and render the view
- Use a hbs `#each` loop to display all your _movie titles_ on that page
- Add a link to the page you just created on the home page so the user can navigate to it.

<br>

## Iteration #8: The Movie Details Page

We've got a list of all movies that displays each of their _titles_, but what if we want to see the other details? In our `movies/movies.hbs` view with our list of movies, let's add links so that the user can click on any movie's title, and go to a details page of each movie. On this page, we will show all the details of that movie.
Here's the route we will be using:

<br>

| Route         | HTTP Verb | Description           |
| ------------- | --------- | --------------------- |
| `/movies/:id` | GET       | Show a specific movie |

<br>

### Steps we will follow in this iteration:

1. We need `/:id` part to change dynamically as we click on different movies' titles. This being said, as part of the loop that displays each movie's title, add a link that goes to the `/movies/:id` route with the `:id` replaced by the actual movie's id 🔑
2. Create the `/movies/:id` GET route in `routes/movies.routes.js`.
3. In the route:
   - On the `Movie` model call `findOne()` or `findById()` method to retrieve the details of a specific movie by its `id`
     - Don't forget you have `cast` as the array of celebrity `id`s, and we need to `populate()` in order to get the full data about the celebrities 🎯
   - If everything is fine (_.then()_), render the `movies/movie-details` view and pass the variable with the movie's details into the view
   - If there's an error, catch it.
4. In the `views/movies/movie-details.hbs` view file:
   - Add an `<h2>` for the page's heading.
   - Display tags with the movie's `title`, `genre` and `plot`.
   - Use a hbs `#each` loop to display the cast's `name`, `occupation` and `catchPhrase`

<br>

## Iteration #9: Deleting Movies

Now that we have a list of movies, a movie details page, and a page to create new movies, we only have 2 features left to implement: _editing_ movies and _deleting_ them. Since deleting is simpler, let's start with that.

<br>

| Route                | HTTP Verb | Description             |
| -------------------- | --------- | ----------------------- |
| `/movies/:id/delete` | POST      | Delete a specific movie |

<br>

### Steps we will follow in this iteration:

1. In the `movies/movie-details.hbs` file:
   - Add a `<form>` tag that makes a POST request to `/movies/:id/delete` where the `:id` is replaced by the actual `id` of the movie.
   - Add a `<button>` tag inside the form so that it can be submitted.
2. Create the `/movies/:id/delete` POST route in your `routes/movies.routes.js` file
3. In the route:
   - Use the `Movie` model's `findByIdAndRemove()` method to delete the specific movie by its `id`.
   - If everything is good (`.then()`), redirect to the list of movies page
   - If there's an error, catch it

<br>

## Iteration #10: Editing Movies

Final piece of our CRUD puzzle: **editing existing movies**.

Here are the routes we will be using:

<br>

| Route              | HTTP Verb | Description                                                            |
| ------------------ | --------- | ---------------------------------------------------------------------- |
| `/movies/:id/edit` | GET       | Show a form to edit a movie                                            |
| `/movies/:id/edit` | POST      | Send the data from the form to this route to update the specific movie |

<br>

### Steps we will follow in this iteration:

1. Create the `/movies/:id/edit` GET route in `routes/movies.routes.js`.
2. In that route:
   - Call the `Movie` model’s `findOne()` or `findById()` method to retrieve a specific movie by its _id_
   - Call the `Celebrity` model's `find()` to retrieve all celebrities for the cast.
   - If everything is good, render the `movies/edit-movie` view
   - Pass the variable with the movie's details and all celebrities into the view
3. In the `movies/edit-movie.hbs` view file:
   - Add an `<h2>` tag for the page's heading.
   - Add a `<form>` tag that makes a POST request to `/movies/:id` with the `:id` replaced by the actual movie's _id_.
   - Add `<input>` tags inside the form for each attribute of the movie.
     - **Hint**: When you render the edit form, make sure each of the input fields is pre-filled with the current value of the attribute for that movie
   - Add `<select>` and `<option>` tags that will handle the cast attribute.
   - **BONUS**: Make the current cast members _selected_ so the user knows who is in the cast currently.
   - Add a `<button>` tag inside the form so that the user can submit the form once they are done editing.
4. Create `/movies/:id` POST route in the `routes/movies.routes.js` file
5. In that route:
   - Create an object with movie's model keys and it's values should come from the form submission (which is `req.body`)
   - Now you can apply different methods - `update()` or `findByIdAndUpdate()` to find the movie and send the updated values to the database.
   - If there is no error, redirect back to the movie details page.

And we are done! Now all `movies` CRUD features are implemented with a relationship between `movies` and `celebrities`. As a **BONUS**, feel free to also add details view, edit and delete for the `celebrities`.

<br><br>

## Bonus for Celebrity model

- See the details of a specific celebrity
- Update existing celebrities
- Delete celebrities

<br>

That's it! 🏆

**Happy Coding!** :heart:
