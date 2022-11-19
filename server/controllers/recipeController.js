require("../models/database");
const Category = require("../models/Category");
const Recipe = require("../models/Recipe");

// Homepage
exports.homepage = async (req, res) => {
  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);

    // Latest Recipes
    const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);

    // Thai
    const thai = await Recipe.find({ category: "Thai" }).limit(limitNumber);

    // American
    const american = await Recipe.find({ category: "American" }).limit(
      limitNumber
    );
    // Chinese
    const chinese = await Recipe.find({ category: "Chinese" }).limit(
      limitNumber
    );

    const food = { latest, thai, american, chinese };

    res.render("index", { title: "Cooking Blog - Homepage", categories, food });
  } catch (err) {
    res.status(500).send({ message: err.message || "Error occured" });
  }
};

// Categories
exports.exploreCategories = async (req, res) => {
  try {
    const limitNumber = 20;
    const categories = await Category.find({}).limit(limitNumber);

    res.render("categories", {
      title: "Cooking Blog - Categories",
      categories,
    });
  } catch (err) {
    res.status(500).send({ message: err.message || "Error occured" });
  }
};
