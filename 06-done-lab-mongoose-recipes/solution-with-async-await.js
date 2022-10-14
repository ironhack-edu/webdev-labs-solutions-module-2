const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data'); // Import of the data from './data.json'

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const franklesRecipe = {
  title: 'Pesto di Frankles',
  level: 'Easy Peasy',
  ingredients: ['Pasta', 'Pesto', 'Love'],
  cuisine: 'Ironhack',
  dishType: 'main_course',
  duration: 0,
  creator: 'Franckles'
};

async function createRecipes() {
  try {
    const x = await mongoose.connect(MONGODB_URI);
    console.log('\nPromise 1');
    console.log(`Connected to the database: "${x.connection.name}"`);
    
    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();
    console.log('\nPromise 2');
    console.log("All existing recipes deleted from the DB!!!")

    const oneRecipe = await Recipe.create(franklesRecipe);
    console.log('\nPromise 3');
    console.log(`Recipe created: ${oneRecipe.title}`)    

    const recipes = await Recipe.insertMany(data);
    console.log('\nPromise 4');
    console.log(`Created ${recipes.length} recipes`);    

    const updatedRecipe = await Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true });
    console.log('\nPromise 5');
    console.log(`Updated ${updatedRecipe.title} and new duration is: ${updatedRecipe.duration}`);    

    const result = await Recipe.deleteOne({ title: 'Carrot Cake' });
    console.log('\nPromise 6');    
    console.log(`The recipe was deleted:`, result);


    await mongoose.connection.close();
    console.log('\nPromise 7');
    console.log('Database connection closed.')

  } catch (err) {
    console.log(err);
  }
}

createRecipes();