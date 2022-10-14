const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from the file './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    console.log("All existing recipes deleted from the DB!!!")
    // Run your code here, after you have insured that the connection was made
    // iteration 2

    const newRecipe = {
      title: 'Mixto quente',
      level: 'Easy Peasy',
      ingredients: ['pão francês', 'queijo', 'presunto'],
      cuisine: 'Brasileira',
      dishType: 'snack',
      image:
        'http://culinaria.culturamix.com/blog/wp-content/gallery/misto-quente-3/Misto-Quente-6.jpg',
      duration: 5,
      creator: 'unknown'
    };


    return Recipe.create(newRecipe);
  })
  .then(result => console.log(`Recipe created: ${result}`))
  .then(() => Recipe.insertMany(data))
  .then(result => {
    // console.log(`Created recipes:`, result);
    console.log(`Created ${result.length} recipes`);
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
  })
  .then(result => {
    console.log(`Updated ${result.title} and new duration is: ${result.duration}`);

    return Recipe.deleteOne({ title: 'Carrot Cake' })
  })
  .then((result) => {
    console.log("The recipe was deleted", result);
  })
  .catch(error => {
    console.error("Error: ", error);
  })
  .finally(() => mongoose.connection.close())
