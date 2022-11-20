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

// Recipe
exports.exploreRecipes = async (req, res) => {
  try {
    let recipeID = req.params.id;

    const recipe = await Recipe.findById(recipeID);

    res.render("recipe", { title: "Cooking Blog - Recipe", recipe });
  } catch (err) {
    res.status(500).send({ message: err.message || "Error occured" });
  }
};

// Contact
exports.contact = async (req, res) => {
  try {
    res.render("contact", { title: "Cooking Blog - Contact" });
  } catch (err) {
    res.status(500).send({ message: err.message || "Error occured" });
  }
};

// Explore Categories by ID
exports.exploreCategoriesById = async (req, res) => {
  try {
    let categoryID = req.params.id;
    const limitNumber = 20;
    const categoryByID = await Recipe.find({ category: categoryID }).limit(
      limitNumber
    );

    res.render("categories", {
      title: "Cooking Blog - Categories",
      categoryByID,
    });
  } catch (err) {
    res.status(500).send({ message: err.message || "Error occured" });
  }
};

// Search Recipe
exports.searchRecipe = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;

    let recipe = await Recipe.find({
      $text: { $search: searchTerm, $diacriticSensitive: true },
    });

    res.render("search", {
      title: "Cooking Blog - Categories",
      recipe,
    });
  } catch (err) {
    res.status(500).send({ message: err.message || "Error occured" });
  }
};

// Explore Latest
exports.exploreLatest = async (req, res) => {
  try {
    const limitNumber = 20;
    const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);

    res.render("explore-latest", {
      title: "Cooking Blog - Explore Latest",
      recipe,
    });
  } catch (err) {
    res.status(500).send({ message: err.message || "Error occured" });
  }
};

// Explore Random
exports.exploreRandom = async (req, res) => {
  try {
    let count = await Recipe.find().countDocuments();
    let random = Math.floor(Math.random() * count);
    let recipe = await Recipe.findOne().skip(random).exec();

    res.render("explore-random", {
      title: "Cooking Blog - Explore Random",
      recipe,
    });
  } catch (err) {
    res.status(500).send({ message: err.message || "Error occured" });
  }
};

// Submit Recipe
exports.submitRecipe = async (req, res) => {
  const infoErrorsObj = req.flash("infoErrors");
  const infoSubmitObj = req.flash("infoSubmit");

  res.render("submit-recipe", {
    title: "Cooking Blog - Submit Recipe",
    infoErrorsObj,
    infoSubmitObj,
  });
};

// Submit Recipe on post
exports.submitRecipeOnPost = async (req, res) => {
  try {
    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if (!req.files || Object.keys(req.files).length === 0) {
      res.render("modal", { title: "Cooking blog - Error" });
    } else {
      imageUploadFile = req.files.img;
      newImageName = Date.now() + imageUploadFile.name;

      uploadPath =
        require("path").resolve("./") + "/public/uploads/" + newImageName;

      imageUploadFile.mv(uploadPath, (err) => {
        if (err) return res.status(500).send(err);
      });
    }

    const newRecipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category,
      img: newImageName,
    });

    await newRecipe.save();

    req.flash("infoSubmit", "Recipe has been added.");
    res.redirect("/submit-recipe");
  } catch (err) {
    req.flash("infoErrors", err);
    res.redirect("/submit-recipe");
  }
};
