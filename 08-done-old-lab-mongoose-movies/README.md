![](https://i.imgur.com/1QgrNNw.png)
# CRUD | Mongoose Movies

## Learning Goals


- Develop and understanding of the basic CRUD actions
- Use Mongoose in an Express application
- Implement the basic CRUD actions with 2 models in one application


## Exercise
## Requirements
- [Fork this repo](https://guides.github.com/activities/forking/)
- Clone your fork into your `~/code/labs` folder.
- Navigate into the folder you just cloned and create the project with the Express generator command.  
       ```express --ejs nameOfYourProject ```
- The ```--ejs``` command tells express to use ejs files for the views



## Submission

Upon completion, run the following commands
```
$ git add .
$ git commit -m "done"
$ git push origin master
```

## Introduction
Everyone likes celebrities, right? Well, even if you don't, now is your chance to create your own, better, fictional celebrities!
Let's create an Express app with all the basic CRUD actions that will allow the user to create their own celebrities and edit them as they see fit.

The user should be able to:

1. See the list of celebrities.
2. See the details of a celebrity.
3. Add new celebrities.
4. Update existing celebrities.
5. Delete celebrities.

But wait! That's not all!

Once we have our celebrities, we need something for them to do!
Let's make up some movie ideas for our celebrities to star in.  
That means we'll need all the basic CRUD actions for movies as well.  

The user should be able to:

6. See the list of movies.
7. See the details of a movie.
8. Add new movies.
9. Update existing movies.
10. Delete movies.



## Deliverables

All the files that make your Express/Mongoose app work, including your `celebrities.js`, and `movies.js` routes files and your `celebrity.js`, and `movie.js` model files.


## Iteration #1: The `Celebrity` Model

Once we have generated our Express app, our first step is to create the `Celebrity` model and seed some initial celebrities in our database.

The `Celebrity` model should have:
- `name` - String (like _Tom Cruise, Beyonce, Daffy Duck,_ etc.)
- `occupation` - String (what the celebrity does, why they are famous.  For example _actor, singer, comedian_, or you can put _unknown_ if your celebrity is someone like Kim Kardashian)
- `catchPhrase` - String (every celebrity needs a good catch phrase.  Well maybe not all of them have one in real life, but all of _our_ celebrities will have a catch phrase.  This can be pretty much anything)


### Steps we will follow in this iteration:

1. Create the `celebrity.js` model file in the `models/` folder.
2. In the `celebrity.js` model file:
    - Create the celebrity schema with `name`, `occupation` and `catchPhrase`.
    - Create the `Celebrity` model with the schema.
    - Export the `Celebrity` model.
3. Create the `seeds.js` file in the `bin/` folder.
4. In `seeds.js` file:
    - Create an array of 3 objects, each with `name`, `occupation` and `catchPhrase` for our initial celebrities.
    - Call the `Celebrity` model's `create` method with the array as argument.
    - In the `create` method's callback, display feedback.
5. Run the seed file with `node` to seed your database.
6. Check the database with the `mongo` command to confirm that your data was saved.


## Iteration #2: Listing Our Celebrities

Now that we've got some celebrities in the database, we can start working with them in our Express app. Let's **display a list of all the celebrities**.

Here's the route we will be using:

|   Route   | HTTP Verb |   Description   |
|-----------|-----------|-----------------|
| `/celebrities` |    GET    | Show all celebrities |

### Steps we will follow in this iteration:

1. Locate the `/celebrities` GET route in `routes/celebrities.js`.
2. In the route callback:
    - Call the `Celebrity` model's `find` method to retrieve all the celebrities.
    - If there's an error, call the route's `next` function and return the error.
    - If there isn't an error, render the `celebrities/index` view.
    - Pass the array of drones into the view as a variable.
3. Create the `celebrities/` folder inside `views/`.
4. Create the `index.ejs` view file inside the `views/celebrities/` folder.
5. In the `views/celebrities/index.ejs` view file:
    - Add an `<h2>` tag for the page's heading.
    - Use a loop to display tags with each celebrity's `name`.
6. In the `views/index.ejs` (homepage) file:
    - Add a link that goes to the `/celebrities` route.


## Iteration #3: The Celebrity Details Page

We've got a list of celebrities that displays each of their `name`, but what if we want to see the other details? In our `views/celebrities/index.ejs` view with our list of celebrities, let's add links so that the user can click on any celebrity's name, and go to a page specifically for that celebrity.  On this page, we will show all the details of that celebrity.



Here's the route we will be using:

|     Route     | HTTP Verb |      Description      |
|---------------|-----------|-----------------------|
| `/celebrities/:id` |    GET    | Show a specific celebrity |


### Steps we will follow in this iteration:

1. Create the `/celebrities/:id` GET route in `routes/celebrities.js`.
2. In the route callback:
    - Call the `Celebrity` model's `findOne` or `findById` method to retrieve the details of a specific celebrity by its id.
    - If there's an error, call the route's `next` function and return the error.
    - If there isn't an error, render the `celebrities/show` view.
    - Pass the variable with the celebrity's details into the view.
3. Create the `show.ejs` view file inside the `views/celebrities/` folder.
4. In the `views/celebrities/show.ejs` view file:
    - Add an `<h2>` for the page's heading.
    - Display tags with the celebrity's `name`, `occupation` and `catchPhrase`.
6. In the `views/celebrities/index.ejs` view file:
    - As part of the loop that displays each celebrity's name, add a link that goes to the `/celebrities/:id` route with the `:id` replaced by the actual celebrity's id.

## Iteration #4: Adding New Celebrities

Now that we have a list of celebrities, as well as a personalized details page for each celebrity, let's make it so the user can **add new celebrities to the database**

|     Route     | HTTP Verb |          Description          |
|---------------|-----------|-------------------------------|
| `/celebrities/new` |    GET    | Show a form to create a celebrity |
|   `/celebrities`   |   POST    | Send the data from the form to this route to create the celebrity and save to the database  |

### Steps we will follow in this iteration:

1. Locate the `/celebrities/new` GET route in `routes/celebrities.js`:
2. In that route's callback:
  - Render the `celebrities/new` view.
3. Create the `new.ejs` view file inside the `views/celebrities` folder
4. In the `views/celebrities/new.ejs` view file:
   - Add an `<h2>` for the page's heading.
   - Add a `<form>` tag that makes a POST request to `/celebrities`.
   - Add `<input>` tags inside the form so the user can fill in values for each attribute of the celebrity.  Make an input for `name`, `occupation`, and `catchPhrase`
   - Add a `<button>` tag in the form so the user can submit the form once they are done filling it out.
5. Locate the `/celebrities` post route in `routes/celebrities.js`.
6. In that route's callback:
    - Create an object with keys for `name`, `occupation`, and `catchPhrase`.
    - Values for those keys should come from the form (`req.body` is the object full of the values from the form)
    - Create an instance of the `Celebrity` model with the object you made in the previous step
    - Call the `save` method to save the new celebrity to the database
    - If there is an error, render the `celebrities/new` view so the user can try again.
    - If there is no error, redirect to the page with the list of celebrities
7. In the `views/celebrities/index.ejs` view file:
    - Add a link that goes to the page you just created with the form to create a new celebrity.

## Iteration #5: Deleting Celebrities

Now that we have a list of celebrities, a celebrity details page, and a page to create new celebrities, we only have 2 features left to implement: editing celebrities and deleting them.  Since deleting is simpler, let's start with that.

|        Route         | HTTP Verb |       Description       |
|----------------------|-----------|-------------------------|
| `/celebrities/:id/delete` |   POST    | Delete a specific celebrity |

### Steps we will follow in this iteration:

1. In the `views/celebrities/index.ejs` file:
    - As part of the loop, add a `<form>` tag that makes a POST request to `celebrities/:id/delete` where the `:id` is replaced by the actual `id` of each celebrity.
    - Add a `<button>` tag inside the form so that it can be submitted.
2. Create the `/celebrities/:id/delete` POST route in your `routes/celebrities.js` file
3. In that route's callback:
    - Use the `Celebrity` model's `findByIdAndRemove` method to delete the celebrity by its `id`.
    - If there's an error, call the route's `next` function and return the error
    - If there is no error, redirect to the list of celebrities page.  


## Iteration #6 (Bonus): Editing Celebrities

Final piece of our CRUD puzzle: **editing existing celebrities**.

Here are the routes we will be using:

|       Route        | HTTP Verb |          Description          |
|--------------------|-----------|-------------------------------|
| `/celebrities/:id/edit` |    GET    | Show a form to create a celebrity |
|   `/celebrities/:id`    |   POST    | Show a specific celebrity         |


### Steps we will follow in this iteration:

1. Create the `/celebrities/:id/edit` GET route in `routes/celebrities.js`.
2. In that route's callback:
    - Call the `Celebrity` model’s `findOne` or `findById` method to retrieve a specific celebrity by its id.
    - If there's an error, call the route's `next` function and return the error.
    - If there isn't an error, render the `celebrities/edit` view.
    - Pass the variable with the celebrity’s details into the view.
3. Create the `edit.ejs` view file inside the `views/celebrities/` folder.
4. In the `views/celebrities/edit.ejs` view file:
    - Add an `<h2>` tag for the page's heading.
    - Add a `<form>` tag that makes a POST request to `/celebrities/:id` with the `:id` replaced by the actual celebrity's id.
    - Add `<input>` tags inside the form for each attirbute of the celebrity.
      - Bonus: When you render the edit form, make sure each of the input fields is pre-filled with the current value of the attribute for that celebrity
    - Add a `<button>` tag inside the form so that the user can submit the form once they are done editing.
5. Locate the `/celebrities/:id` POST route in the `routes/celebrities.js` file.
6. In that route's callback:
    - Create an object with keys for each attribute of a celebrity (celebrity has 3 attributes. What were they again? Look back and review if you forgot.)
    - Values for those keys should come from the form submission (`req.body`).
    - Call the `Celebrity` model’s `update` method and use the celebrity's id to specify which celebrity we are updating. Also, use the object you just created with the updated attributes for the celebrity and pass this object into the `update` method as the second argument.
    - If there is an error retrieving that celebrity, call the route's `next` function and return the error
    - If there is no error, redirect back to the list of celebrities.

## Celebrities - Done!
At this point, we have implemented all the basic CRUD actions for the Celebrity model in our app.  Nice work!

Now that we've done all this good work, it's time to do it all over again, but for the Movie model.  After all, what's the point of having all these celebrities if we can't make up fake movies to cast them in?

We are going to create a `Movie` model and implement all the same CRUD actions for this model as well.  Don't worry, it's really much easier the second time around.  

## Iteration #7: The `Movie` Model
Let's jump right in.

First of all, we'll need to create the `Movie` model.

The `Movie` model should have:
- `title` - String
- `genre` - String
- `plot` - String


### Steps we will follow in this iteration:

Go back and review what you did to create the `Celebrity` model.  You'll need to create a file for the model, and in that file, you'll need to create a schema for the model as well.

Once you've done that, go to your `seeds.js` file in the `bin/` folder and either delete or comment out the seeds you made before for your celebrities.
Replace these seeds with seeds for fake movies.  If you don't delete/comment what you had before, when you run the seeds file with the `node` command in the terminal, it will create duplicates of all your celebrities.

Afterward, check the database with the `mongo` command to confirm that your data was saved.


## Iteration #8: Listing Our Movies

Now that we've got some movies in the database, let's make a page where we list all our movies, just like we did with the `Celebrity` model.


### Steps we will follow in this iteration:

Go back and review how you did this for the `Celebrity` model.  You'll need to
  - Create a route.
  - Create a view file (and a folder for all your `movies` view files).
  - Use a database query to retrieve all the movies in your database and render the view.
  - Use a loop to display all your movies on that page
  - Add a link to the page you just created on the home page so the user can navigate to it.



## Iteration #9: The Movie Details Page

Now that we've got a list of movies,  let's add a details page for each movie just like we did with our celebrities.  



### Steps we will follow in this iteration:

Go back and review what you did for the `Celebrity` model.  You'll need to:
  - Create a route
  - Use a database query to retrive the specific movie that was clicked by the user.
  - Pass that movie into the view as a variable
  - Create the view file
  - In the view, display all the details of the movie.
  - On the Movies index page, make each movie a link to its own details page.


## Iteration #10: Adding New Movies

Okay, the next step is to make it so the user can **add new movies to the database**

### Steps we will follow in this iteration:

Review how you did this for the `Celebrity` model.
  - Create 2 new routes, one to render page with the form on it, and one to send the data to after the form is filled out.
  - Create a view file to render the form.
  - Make sure the form is making a POST request to the other route you just created.
  - In your post route, create an object with all the info you just received from the form. (Remember, `req.body`)
  - Use this object to create a new movie and save it to the database and redirect back to the page with your list of movies.
  - Make sure to add a link to the form on the movies index page.


## Iteration #11: Deleting Movies

Okay, only 2 features left, deleting and editing.


### Steps we will follow in this iteration:
Review how you did this with the `Celebrity` model.

  - Add a button (inside of a form) next to each movie in your movies index page.
  - Create a route
  - Use a databse query to retrieve the Movie that was just clicked, and delete it from the database.


## Iteration #12 (Bonus): Editing Movies

Final piece of our CRUD puzzle: **editing existing movies**.


### Steps we will follow in this iteration:
Review how you did this for the `Celebrity` model.

  - Create 2 routes, one to display a form, and another to receive the data from that form.
  - Create a view file to display the edit form.
  - Use a databse query to retrieve one movie from the database and pass that movie into the page with the form on it.
  - Render the view with the form, and pre-fill all the input fields with the current info about that movie.
  - Make sure your form is submitting a POST request to the other route you just created.
  - When the form is submitted, receive the data from the form and create an object with all the info.
  - Make a databse query to retrieve the movie from the database and update the movie with the object you just created with all the info from the form.
  - Make sure you add a link to the edit page on your movies index page.


# That's it!
