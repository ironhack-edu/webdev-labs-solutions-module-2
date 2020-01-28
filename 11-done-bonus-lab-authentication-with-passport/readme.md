![Ironhack Logo](https://i.imgur.com/1QgrNNw.png)

# PP | Authentication With PassportJs

## Learning Goals

After this lesson, you will:

- Develop an understanding of how authentication and authorization work in a web application.
- Understand why these features are useful.
- Be able to use Passport in an Express application.
- Be able to implement sign-up and login features with Passport.

## Requirements

- Fork this repo.
- Clone this repo into your ~/code/labs.

## Submission

Upon completion, run the following commands:

```
$ git add .
$ git commit -m "done"
$ git push origin master
Navigate to your repo and create a Pull Request -from your master branch to the original repository master branch.
```

In the Pull request name, add your campus, first name and last name separated by a dash "-".

## Deliverables

The starter-code provides the basic layout and organization for this assignment. Please push everything you need to make it work properly to GitHub before creating the pull request.

## Introduction

![](https://s3-eu-west-1.amazonaws.com/ih-materials/uploads/upload_676b436fcf47e71b1f85cbd8d318a080.png)

You may already know how Passport works and how to integrate it in your projects. Now it's time to practice by creating an Express application with Passport.

## Iteration #1: The Sign-up Feature

The repo you cloned comes with a User model and a router file already made for you. It also has all the views you need there, although some are empty.

Add a new route to your `passportRouter.js` file with the path `/signup` and point it to your `views/passport/signup.hbs` file.

Now, in that file, add a form that makes a POST request to `/signup`, with a field for `username` and `password`.

Finally, add a post route to your `passportRoute` to receive the data from the signup form and create a new user with the data.

## Iteration #2: The Login Feature

In order to add the login feature, let's add 1 get route to our router to display the login page. Once we have that, let's add a form to our `views/passport/login.hbs` file. The form should make a POST request to `/login`. Once we have the form, let's add another route to the router to receive that data and log the user in.

**But Wait**

In order to do that, we need to configure Sessions and initialize a session with passport in our `app.js` file. We also need to add the `passport.serializeUser` functions as well as defining the Passport Local Strategy.

## Private Page

In the repo you forked, there is a file called `private.hbs`. This page is referenced in the Passport Router with the path `/private-page`. We use the `ensureLogin.ensureLoggedIn()` function to make sure that the user is logged in before viewing this page.

If everything worked correctly, the user should be able to sign up, log in, and then visit the page, where they will receive a personalized greeting.

/Happy coding!
