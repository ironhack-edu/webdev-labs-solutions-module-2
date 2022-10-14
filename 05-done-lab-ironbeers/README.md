![logo_ironhack_blue 7](https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png)

# LAB | Express IronBeers

## Introduction

Sometimes you would just like to have a very descriptive list of all beers so you could see their type, color, each beer's percentage of alcohol, or which beer is well pared with some food. In this lab, you will create a web app where the user will be able to see a list of beers, get random suggestions, and read a very descriptive explanation of each beer.

"How will we get all of this information?", you might ask. Well, we will be using an npm package :package: as our data source.

For this exercise, we will work with the **[PunkAPI](https://www.npmjs.com/package/punkapi-javascript-wrapper)** npm package. In the background, the package communicates with a remote _database_ that contains all of the beers. The package enables us to use its methods that can help us to retrieve beers. Each beer has some properties, and we can play around with this data to practice working with Handlebars templates, `layouts` and `partials`.

**In this lab, we can also practice reading external (PunkAPI) docs and learn how to get what we need from the database.**

## Requirements

- Fork this repo
- Then clone this repo.

## Submission

- Upon completion, run the following commands:

```shell
$ git add .
$ git commit -m "done"
$ git push origin master
```

- Create Pull Request so your TAs can check up your work.

## Instructions

### Iteration 0: Initial setup

To run our application, the first thing you have to do is to install all of its dependencies. Run the following command:

```shell
$ npm install
```

To run the app:

```shell
$ node app.js

# you can also run: npm start
```

### Iteration 1: Layout barebones

Our starter code includes the basic configuration needed to run our app. The **`/`** route is set to render the `index.hbs` file. Let's start by creating a layout.

Inside of the `views` folder, create a `layout.hbs` file. In the bonus iteration, you can give your app some style, but for now, let's focus on the logic.

Remember to add the `{{{ body }}}` to the **main layout**.

Add a navbar that includes links to 3 pages:

- _Home_ ==> should navigate to `/`.
- _Beers_ ==> should navigate to `/beers`.
- _Random Beer_ ==> should navigate to `/random-beer`.

Layout done, let's move to creating these three pages.

### Iteration 2 - Home _page_

- The first page should be **Home** and should be rendered on **`/`**. The file that gets rendered is `index.hbs`.
- This file should include the _beer image_, which you can find at `/public/images`. Together with the image, `index.hbs` should have two links: `Check the Beers!` and `Check a Random Beer`. Both links should navigate to the corresponding routes (which we previously defined in our navbar as well). Later, you can style these `a` tags to make them look like buttons.

![image](https://user-images.githubusercontent.com/23629340/36723774-7d791ef2-1bb1-11e8-991b-39dbf4fd8a59.png)

### Iteration 3 - Beers _page_

The next thing we will be working on is a page where we can present all the beers we will retrieve from the remote database. This page will be rendered every time the user visits the the `/beers` route.

This leads us to the conclusion that in this step, we have the two main focus areas:

- the `/beers` route and
- the `beers.hbs` view.

#### Iteration 3.1 The `/beers` route

In this step, we will have a couple of micro-steps:

- Create a `/beers` route inside the `app.js` file.
- Inside the `/beers` route, call the `getBeers()` method (the **PunkAPI** provides this method, and you can find more about it [here](https://www.npmjs.com/package/punkapi-javascript-wrapper#getbeersoptions)). **Calling the `.getBeers()` method returns a promise that should be resolved with an array of 25 beers**.
- Down the road, you should pass that array to the `beers.hbs` view.

The example of how this method works is shown below:

```js
punkAPI
  .getBeers()
  .then(beersFromApi => console.log('Beers from the database: ', beersFromApi))
  .catch(error => console.log(error));
```

#### 3.2 The `beers.hbs` view

- Create a `beers.hbs` file to render every time we call this route.
- This file should have access to the beers we get as a response from the database. Remember, you should call the `render` method after getting the _beers_ array. _Hint:_ That means inside of the function you're passing to the `then` method. :wink:
- On the `beers.hbs` view, loop over the **array of beers** using an `{{#each}}` loop. Display an **image**, **name**, **description** and **tagline**.

Now, when you click on the `Beers` link on the top navigation or on the `Check the beers` button, you should be able to see all the beers. Boom! :boom:

### Iteration 4 - Random beer _page_

As in the previous step, we will have to focus on creating a route to display a random beer. When a random beer is retrieved, we have to pass it to the view.

#### 4.1 The `/random-beer` route

- Let's create the `/random-beer` route.
- Inside the route, you should call the PunkAPI `getRandom()` method. It returns a promise that will resolve with a different beer object on every call. Look at the [documentation](https://www.npmjs.com/package/punkapi-javascript-wrapper#getrandom) to understand the structure of the data that you're supposed to get back. :+1:

The example of how this method works is shown below:

```js
punkAPI
  .getRandom()
  .then(responseFromAPI => {
    // your magic happens here
  })
  .catch(error => console.log(error));
```

- Eventually, the received beer needs to be passed to the `random-beer.hbs` file. You still don't have this file, so let's proceed to create it.

#### 4.2 The `random-beer.hbs` view

- The `random-beer.hbs` should display the random beer that was retrieved from the database. You should display an **image**, **name**, **description**, **tagline**, **food pairing** and **brewer tips**. The following image shows how this page could look like if you give it a bit of style. However, the styling will come later, so, for now, focus on rendering all the information:

![image](https://user-images.githubusercontent.com/23629340/36724536-c5924892-1bb3-11e8-8f22-fd1f8ce316af.png)

Now, every time the user clicks on the _Random beer_ link in the navbar or on the _Check a random beer_ button on the home page, they should see this page with a new, random beer.

**You've just finished all the mandatory iterations. Good job!**

Let's proceed to the bonus iterations.

:::info
On every iteration, you should render a `partial` passing the information regarding the corresponding beer.
:::

### Bonus: Iteration 5 - Beer partial

**Partials represent templates that are likely to be reused.**

Let's see what beer properties we display on the `/beers` _(the beers page)_ and compare them with the properties we displayed on the `/random-beer` _(random beer)_ page:

| properties/ page |      `/beers`      |   `/random-beer`   |
| :--------------: | :----------------: | :----------------: |
|      image       | :white_check_mark: | :white_check_mark: |
|       name       | :white_check_mark: | :white_check_mark: |
|   description    | :white_check_mark: | :white_check_mark: |
|     tagline      | :white_check_mark: | :white_check_mark: |
|   food pairing   |        :x:         | :white_check_mark: |
|   brewer tips    |        :x:         | :white_check_mark: |

As we can see, we have 4 in common properties, which means our code could be a bit more **DRY** if we refactor it using _partials_.

You should create a partial to show each beer.

- First, we need to register where our `partials` will be located. So you need to add the following code to the `app.js` file:

```jsx
hbs.registerPartials(path.join(__dirname, 'views/partials'));
```

- Next, you should create a `partials` folder inside the `views`, and `beerpartial.hbs` file inside the `partials` folder (**Note**: We're not including dashes in the `hbs` partial names, since handlebars partials need to follow the same naming conventions as JavaScript variables).
- Our `beerpartial.hbs` will display the properties that both views share: **image**, **name**, **description**, and **tagline** of the beer.
- Now, you can go ahead and plug in this partial in the `beers.hbs` view inside the `each` loop.

After creating the partial, and looping over the array of beers, on our `/beers` route, we should have the following:

![image](https://user-images.githubusercontent.com/23629340/36724392-61fa7336-1bb3-11e8-8468-189908167e10.png)

- Also, you can use it in the `random-beer.hbs` page.

Our code shrunk by a lot just because we managed to create a reusable piece of code (the partial), which we can now place wherever we need to use this set of properties.

### Bonus: Iteration 6

Make all the beers on the beers page clickable. If users click on a specific beer, they should be able to see a page with the detailed information of that particular beer. **You can reuse the same partial you used for iteration 5**. As a matter of fact, you should. That's what partials are for. The trick is to wrap an anchor tag around every beer that has the beer `id` in the `href` property. Something like:

```html
<a href="/beers/beer-i3f4d34s34b"><!-- name of the beer --></a>
```

To understand how you can get the `id` from the URL, read this section of the [Express docs](http://expressjs.com/en/4x/api.html#req.params).

To find out how you can get an individual beer from the punkAPI using the _beerId_, check out the [`.getBeer(id)` method on the punkAPI docs](https://www.npmjs.com/package/punkapi-javascript-wrapper#getbeerid).

### Bonus: Iteration 7

The overall layout should look like this:

![image](https://user-images.githubusercontent.com/23629340/36723450-8bbcb164-1bb0-11e8-81c3-4fe939730bb9.png)

You will find the `colors` and `fonts` on the `css` file. Remember to link the `css` file to your **main layout**.

Let your artsy side shine! :sparkles:

Happy Coding! 💙
