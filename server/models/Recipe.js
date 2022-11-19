const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "This field is required",
  },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
