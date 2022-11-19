const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");

// App Routes
router.get("/", recipeController.homepage);
router.get("/categories", recipeController.exploreCategories);
router.get("/recipe/:id", recipeController.exploreRecipes);
router.get("/categories/:id", recipeController.exploreCategoriesById);
router.get("/contact", recipeController.contact);

module.exports = router;
