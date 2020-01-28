![logo_ironhack_blue 7](https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png)

# JS | ES6 - reinforcement

<!-- ## `for...of` Bank - Exercisem-->

![](https://media.giphy.com/media/3o6ZtpoNGDS4cZ8GWY/giphy.gif)

## Introduction

For this exercise, you can use [Repl.it](https://repl.it/) or your code editor.

Using the array of users given in the **`data.js`** file, go ahead and finish the tasks as specified in the task list. You should have your solution saved in the **`index.js`** file.

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

### Iteration 1: `for...of` loop

Create a function `getFirstNames()` and, using [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) loop, iterate over the _usersArray_ and push all the first names into a new array `userFirstNames`.

### Iteration 2: `for...of` loop and ES6 string literals `${}`

Create a function `getFullNames()` which will return an array of strings where each string will represent the full name of each user from the _usersArray_.

**Steps**:

1. using [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) loop iterate over the _usersArray_ and
2. using [ES6 string interpolation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) create a string containing full name (_tip_: access each object via [`dot notation`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors)),
3. push that string into a new array `userFullNames`.

### Iteration 3: ES6 destructuring, `for of loop`, object literal

Create a function `getUsersCreditDetails()` to grab each user's first and last name and their balance.

**Steps**:

1. Using `for...of` loop iterate over the `usersArray`;
2. [Destructure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring) `firstName`, `lastName` and `balance` from each user object to create new variables;
3. After destructuring create a new object using object literal (only name of variable) consisting of `firstName`, `lastName` and `balance`. Check the following example:

```js
const userDetails = {
  firstName,
  lastName,
  balance
};
```

4. Push each new object into a new array `usersCreditDetails`

### Iteration 4: practice `.filter()` method and how to return two elements

Create a function `genderView()` which should return two arrays new arrays `femaleUsers` and `maleUsers`. Depending on the gender, fill them with strings containing users' first and last names.

### Bonus - Iteration 5

Create a function `genderCount()` that should use the returned object from the previous function and print how many females and how many male users there are.

Check the `index.js` to see what should be expected output.

### Bonus - Iteration 6

Create a function `promo20()` to find all users whose balance is greater than 20000 and send them a personalized message offering some promotion.

Check the `index.js` to see what should be expected output.

### Bonus - Iteration 7

Create a function `addActive()` which should loop through the `usersArray` and add a new property `isActive` with a value `true` to all users (hint: each user in the `usersArray` is represented with object and you could use `...` with objects :wink: ).

Check the `index.js` to see what should be expected output.

**Happy coding!** :heart:
