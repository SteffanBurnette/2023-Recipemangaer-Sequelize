const express = require("express");
const app = express();
const port = 4000;
const { query } = require("./database");
require("dotenv").config();
const {recipe_api} = require("./models")

app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.originalUrl}`);
  res.on("finish", () => {
    // the 'finish' event will be emitted when the response is handed over to the OS
    console.log(`Response Status: ${res.statusCode}`);
  });
  next();
});
app.use(express.json());






// Delete a specific Recipe
app.delete("/recipes/:id", async (req, res) => {
    const recipeId = parseInt(req.params.id, 10);
  
    try {
      const deleteOp = await recipe_api.destroy({ where: { id: recipeId } });
  
      if (deleteOp > 0) {
        res.status(200).send({ message: "Recipe deleted successfully" });
      } else {
        res.status(404).send({ message: "Recipe not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  });






// Get all the recipess using .findAll
app.get("/recipes", async (req, res) => {
    try {
      const allrecipes = await recipe_api.findAll();
  
      res.status(200).json(allrecipes);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  });



  // Updates a specific recipe
app.patch("/recipes/:id", async (req, res) => {
    const recipeId = parseInt(req.params.id, 10);
  
    try {
      const [numberOfAffectedRows, affectedRows] = await recipe_api.update(
        req.body,
        { where: { id: recipeId }, returning: true }
      );
  
      if (numberOfAffectedRows > 0) {
        res.status(200).json(affectedRows[0]);
      } else {
        res.status(404).send({ message: "Recipe not found" });
      }
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        return res.status(422).json({ errors: err.errors.map((e) => e.message) });
      }
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  });

  // Get a specific recipe using .findOne
app.get("/recipes/:id", async (req, res) => {
    const recipeId = parseInt(req.params.id, 10);
  
    try {
      const recipe = await recipe_api.findOne({ where: { id: recipeId } });
  
      if (recipe) {
        res.status(200).json(recipe);
      } else {
        res.status(404).send({ message: "Recipe not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  });

  // Create a new recipe using .create
app.post("/recipes", async (req, res) => {
    try {
      const newRecipe = await recipe_api.create(req.body);
  
      res.status(201).json(newRecipe);
    } catch (err) {
      if (err.name === 'SequelizeValidationError') {//maps to find the proper error
        return res.status(422).json({ errors: err.errors.map(e => e.message) });
      }
      console.error(err);
      res.status(500).json({ message: 'An unexpected error occurred.' });
    }
  });



  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
  