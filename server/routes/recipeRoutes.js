const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");

// App Routes
router.get("/", recipeController.homepage);
router.get("/categories", recipeController.exploreCategories);
router.get("/recipe/:id", recipeController.exploreRecipes);
router.get("/categories/:id", recipeController.exploreCategoriesById);
router.get("/contact", recipeController.contact);
router.post("/search", recipeController.searchRecipe);
router.get("/explore-latest", recipeController.exploreLatest);
router.get("/explore-random", recipeController.exploreRandom);
router.get("/submit-recipe", recipeController.submitRecipe);
router.post("/submit-recipe", recipeController.submitRecipeOnPost);

module.exports = router;
