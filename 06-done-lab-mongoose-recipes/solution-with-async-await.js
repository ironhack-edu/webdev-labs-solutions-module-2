const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

const franklesRecipe = {
  title: 'Pesto di Frankles',
  level: 'Easy Peasy',
  ingredients: ['Pasta', 'Pesto', 'Love'],
  cuisine: 'Ironhack',
  dishType: 'Dish',
  duration: 0,
  creator: 'Franckles'
};

async function createRecipes(cb) {
  try {
    const x = await mongoose.connect('mongodb://localhost/recipe-app-dev', {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Promise 1');
    const recipe = await Recipe.create(franklesRecipe).catch(err => console.log(err));
    // console.log(recipe, "this is recipe");
    console.log('Promise 2');
    const recipes = await Recipe.insertMany(data).catch(err => console.log(err));
    console.log('Promise 3');
    const updatedRecipe = await Recipe.updateOne({ title: 'feahiufea' }, { duration: 100 }, { new: true });
    console.log('Promise 4');
    await mongoose.connection.close();
    console.log('Promise 5');
  } catch (err) {
    console.log(err);
  }
}
