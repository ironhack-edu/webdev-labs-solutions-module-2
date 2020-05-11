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

let recipeCreate = Recipe.create(newRecipe);

let dataInsert = Recipe.insertMany(data);

console.log(recipeCreate, dataInsert);

Promise.all([recipeCreate, dataInsert])
  .then(result => {
    console.log(`The recipe is saved and its title is: ${result[0].title}`);
    console.log(result[1]);
    result[1].forEach(item => {
      console.log(`recipe for ${item.title} inserted successfully`);
    });

    let recipeUpdate = Recipe.updateOne(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 }
    );

    let recipeRemove = Recipe.deleteOne({ title: 'Carrot Cake' });

    Promise.all([recipeUpdate, recipeRemove])
      .then(result => {
        console.log(result);
        console.log(`The recipe is updated`);
        console.log(`The recipe  is deleted.`);
        mongoose.connection
          .close()
          .then(() => console.log(`connection closed`))
          .catch(err => console.log(`an error has occurred: ${err}`));
      })
      .catch(err => console.log(`an error has occurred: ${err}`));
  })
  .catch(err => console.log(`an error has occurred: ${err}`));
