![logo_ironhack_blue 7](https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png)

# Axios CRUD Exercise


## Introduction

![image](https://user-images.githubusercontent.com/23629340/36733655-8c9903fa-1bd1-11e8-82f7-d425ab140c09.png)

In this exercise, we will use all what we have learned about APIs and how to connect an application to them through **Axios**.

## Requirements

- Fork this repo
- Then clone this repo


## Submission

- Upon completion, run the following commands:
```
$ git add .
$ git commit -m "done"
$ git push origin master
```
- Create Pull Request so your TAs can check up your work.


## Instructions

We will first create a fake API using **JSON-Server** to then do an application to Create, Read, Update, and Delete characters from it. The routes available in this API are the following:

- **Verb:** GET, **Route:** "/characters"
  - It receives NO parameters
  - It returns the full characters list
  - It returns JSON
- **Verb:** GET, **Route:** "/characters/:id"
  - It receives the character ID as a parameter (route)
  - It returns the character with the indicated `id`
  - It returns JSON
- **Verb:** POST, **Route:** "/characters"
  - It receives an object as a parameter, with the following format:
    `{ name: string, occupation: string, cartoon: boolean, weapon: string }`
  - It returns the created character if there are no errors
  - It returns the wrong fields if there is some error
  - It returns JSON
- **Verb:** PATCH/PUT, **Route:** "/characters/:id"
  - It receives the character `id` as a parameter (route)
  - It receives an object as a parameter, with the following format:
    `{ name: string, occupation: string, cartoon: boolean, weapon: string }`
  - All the fields are optional
  - It returns the updated character if there are no errors
  - It returns "Character not found" if there is no character with the indicated `id`
  - It returns JSON / text
- **Verb:** DELETE, **Route:** "/characters/:id"
  - It receives the character `id` as a parameter (route)
  - It returns "Character has been successfully deleted" if there are no errors
  - It returns "Character not found" if there is no character with the indicated id
  - It returns text


### Iteration 1: The Fake API

![](https://s3-eu-west-1.amazonaws.com/ih-materials/uploads/upload_99257e2c4240770e6b4bdd406d943ac8.png)

In the `api` folder, create a `db.json` file. Inside our `db.json` we will specify the first 2 characters of our API, so we can start working with some data. Copy/paste the following characters in the file:

```javascript
{
  "characters": [
    {
      "id": 1,
      "name": "Han Solo",
      "occupation": "Smuggler",
      "weapon": "Blaster Pistol",
      "cartoon": true
    },
    {
      "id": 2,
      "name": "Luke Skywalker",
      "occupation": "Jedi Knight",
      "weapon": "Lightsaber",
      "cartoon": false
    },
    {
      "id": 3,
      "name": "Sponge Bob",
      "occupation": "Lives under the sea",
      "weapon": "Crabby Patty",
      "cartoon": true
    }
  ]
}
```

Then run the following code in the terminal to make our API start working:

```bash
$ json-server --watch db.json --port 8000
```

### Iteration 2: The `APIHandler.js` file

We have our API running, so now we will construct a class `APIHandler` to deal with the Axios calls. The only responsibility of this class is to display the JSON result that comes from the API, or give the needed information to the API via a function argument.

The functionalities of the `APIHandler` class are:

- Get all the characters info from *[http://localhost:8000/characters](http://localhost:8000/characters)*
- Get a single character info from *[http://localhost:8000/characters/:id](http://localhost:8000/characters/:id)*
- Create a single character posting the data to *[http://localhost:8000/characters](http://localhost:8000/characters)*
- Delete a single character through his id in *[http://localhost:8000/characters/:id](http://localhost:8000/characters/:id)*
- Edit a single character through his id in *[http://localhost:8000/characters/:id](http://ih-crud-api.herokuapp.com/characters/:id)*

You have to create an Axios call for each of these actions. You can create as many functions as you need inside the class, but remember this class should only manage the API request and display the resulting value.

<!-- :::success -->
**Micro-advice**

To make sure everything is working, use [POSTMAN](https://www.getpostman.com/).
<!-- ::: -->

In this iteration, it's enough to show results in the console.

### Iteration 3: The `index.js` file

Once we have the results served by the API in the application, we will create the events that will handle with the CRUD operations.

#### Fetch all characters

![image](https://user-images.githubusercontent.com/23629340/36733634-7b6b6dca-1bd1-11e8-9803-5282681159ba.png)

Retrieve all the available characters in the API and show them in the application. In order to do that, we need to:

- Create a button (*Fetch all* in the image above) that calls a function in the `APIHandler`.
- The function will return a JSON object with all the characters.
- Get the data and show the characters. Finally, with JavaScript, we will create a structure similar to a card (image above) to show detailed info about each character.

#### Fetch one character

![image](https://user-images.githubusercontent.com/23629340/36733678-97ecd42a-1bd1-11e8-8e60-6aab38d632a0.png)


Following the same idea as with fetching all, to retrieve a single character's data we need to:

- Create a button (*Fetch one* in the image above) to, through an input field, get the `id` of an existing character.
- Search that character in the API with *[http://localhost:8000/characters/:id](http://ih-crud-api.herokuapp.com/characters/:id)*
- Get the data and show the character info as a card.

#### Delete one character

![](https://s3-eu-west-1.amazonaws.com/ih-materials/uploads/upload_3d893f20f95e5b13369375cdfd7900a5.png)

To be able to delete a character from the API database, we need to:

- Create a button (*Delete* one in the image above) to get the `id` of the character we want to delete.
- Delete that character in the API with *[http://localhost:8000/characters/:id](http://ih-crud-api.herokuapp.com/characters/:id)*
   <!-- :::danger -->
   **Remember which HTTP verb you need in the request!!**
   <!-- ::: -->
- If the character is successfully removed, change the background color of the button to green.
- If something went wrong, change the background color of the button to red.

#### Create new character

![image](https://user-images.githubusercontent.com/23629340/36733698-a7c64f8e-1bd1-11e8-9b7d-b37c7a800a27.png)

We will create a form with 4 inputs: name(text), occupation(text), weapon(text) and cartoon(checkbox).

- Create a button (*Create* in the image above) to get all the data from the form.
- Send the data to the `APIHandler` function to save the new character through *[http://localhost:8000/characters](http://ih-crud-api.herokuapp.com/characters)*
   <!-- :::danger -->
   **Remember which HTTP verb you need in the request!!**
   <!-- ::: -->
- If the character was successfully created, set the background color of the button to green.
- If something went wrong, change the background color of the button to red.

#### Edit a character

![image](https://user-images.githubusercontent.com/23629340/36733714-b6257b36-1bd1-11e8-8518-c3f7e2ba034c.png)

We will create a form with 4 inputs: name(text), occupation(text), weapon(text) and cartoon(checkbox). Also, we will create a new input to indicate the `id` of the character we want to edit.

- Create a button (*Update* in the image above) to get all the data from the form.
- Send the data to the `APIHandler` function to save the new character through *[http://localhost:8000/characters/:id](http://ih-crud-api.herokuapp.com/characters/:id)*
   <!-- :::danger -->
   **Remember which HTTP verb you need in the request!!**
   <!-- ::: -->
- If the character was successfully updated, set the background color of the button to green.
- If something went wrong, change the background color of the button to red.

That would be all!

Happy coding! :heart:
