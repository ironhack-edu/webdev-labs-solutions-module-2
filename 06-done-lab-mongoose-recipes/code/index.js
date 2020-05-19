const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// require database configuration
require('./configs/db.config');

// iteration 2

let newRecipe = {
  title: 'miXto quente',
  level: 'Easy Peasy',
  ingredients: ['pão francês', 'queijo', 'presunto'],
  cuisine: 'Brasileira',
  dishType: 'Snack',
  image:
    'http://culinaria.culturamix.com/blog/wp-content/gallery/misto-quente-3/Misto-Quente-6.jpg',
  duration: 5,
  creator: 'JOC'
};

Recipe
  // we are passing an object (newRecipe) to the .create() method and
  // under the hood, this method will insert this object as a new document in the database in the "recipes" collection
  .create(newRecipe)
  // .then() resolves if everything worked fine
  .then(result => console.log(`recipe added: ${result.title}`))
  // .catch() handles errors
  .catch(err => console.log(err));

// iteration 3

Recipe
  // here we are passing an array of objects to the ".insertMany()" method that literally does what it says:
  // inserts multiple objects into the database as documents of the "recipes" collection
  .insertMany(data)
  .then(result => {
    result.forEach(item => {
      console.log(`recipe for ${item.title} inserted successfully`);
    });
  })
  .catch(err => console.log(err));

// iteration 4

Recipe
  // under the hood, ".updateOne()" basically works as ".findOneAndUpdate()" method:
  // finds a certain document in the database based on some criteria (in this case based on the "title"),
  // and sets some of the properties to the new values and saves it in the database
  .updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then(() => console.log(`The recipe is updated`))
  .catch(err => console.log(err));

// iteration 5

Recipe
  // under the hood, it works as ".findOneAndDelete" method - find doc based on some criteria (in this case title but could be any other property)
  // and removes it from the DB permanently
  .deleteOne({ title: 'Carrot Cake' })
  .then(() => console.log(`The recipe is deleted`))
  .catch(err => console.log(err));

// iteration 6

mongoose.connection
  // alternative way to using ".close()" method is using ".disconnect()". The best practice is to use ".close()" but you will see sometimes the alternative way as well
  .close()
  .then(() => console.log(`connection closed`))
  .catch(err =>
    console.log(
      `an error while closing database connection has occurred: ${err}`
    )
  );
