const express = require('express');
const isvelid = require('./middleware');

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

let initialRecipe = [
  {
    name: 'Spaghetti Carbonara',
    description: 'A classic Italian pasta dish.',
    preparationTime: '15 minutes',
    cookingTime: '15 minutes',
    imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/carbonara-index-6476367f40c39.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*',
    country: "Italy",
    veg: false,
    id: 1
  },
];

app.get('/', (req, res) => {
  res.send('Welcome to the Recipe API.');
});

app.get('/recipe/all', (req, res) => {
  res.json(initialRecipe);
});

app.get('/index', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get('/add', (req, res) => {
  res.sendFile(__dirname + "/recipe.html");
});

app.post('/recipe/add', isvelid, (req, res) => {
  const { name, description, preparationTime, cookingTime, imageUrl, country, veg } = req.body;
  const newRecipe = {
    name,
    description,
    preparationTime,
    cookingTime,
    imageUrl,
    country,
    veg,
    id: initialRecipe.length + 1
  };
  initialRecipe.push(newRecipe);
  res.send("Recipe added successfully");
});

app.patch('/recipe/update/:id', (req, res) => {
  const { id } = req.params;
  const recipeIndex = initialRecipe.findIndex(recipe => recipe.id == id);
  if (recipeIndex !== -1) {
    initialRecipe[recipeIndex] = { ...initialRecipe[recipeIndex], ...req.body };
    res.send("Recipe updated successfully");
  }
   else {
    res.status(404).send("Recipe not found");
  }
});

app.delete('/recipe/delete/:id', (req, res) => {
  const { id } = req.params;
  const recipeIndex = initialRecipe.findIndex(recipe => recipe.id == id);
  if (recipeIndex !== -1) {
    initialRecipe.splice(recipeIndex, 1);
    res.send("Recipe deleted successfully");
  } else {
    res.status(404).send("Recipe not found");
  }
});

app.listen(8090, () => {
  console.log('Server running on port 8090');
});
