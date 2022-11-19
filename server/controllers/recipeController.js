require("../models/database");
const Category = require("../models/Category");
const Recipe = require("../models/Recipe");

// Homepage
exports.homepage = async (req, res) => {
  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);

    res.render("index", { title: "Cooking Blog - Homepage", categories });
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

// Inserting Data
// const insertDummyCategoryData = async () => {
//   try {
//     await Category.insertMany([
//       {
//         name: "Thai",
//         img: "thai-food.jpg",
//       },
//       {
//         name: "American",
//         img: "american-food.jpg",
//       },
//       {
//         name: "Chinese",
//         img: "chinese-food.jpg",
//       },
//       {
//         name: "Mexican",
//         img: "mexican-food.jpg",
//       },
//       {
//         name: "Indian",
//         img: "indian-food.jpg",
//       },
//       {
//         name: "Spanish",
//         img: "spanish-food.jpg",
//       },
//     ]);
//   } catch (err) {
//     console.error(err);
//   }
// };
