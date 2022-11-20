const addIngredientsBtn = document.getElementById("addIngredientsBtn");
const ingredientList = document.querySelector(".ingredientList");
const ingredientDiv = document.querySelectorAll(".ingredientDiv")[0];

const addIngredients = () => {
  let newIngredients = ingredientDiv.cloneNode(true);
  let input = newIngredients.getElementsByTagName("input")[0];

  input.value = "";
  ingredientList.appendChild(newIngredients);
};

addIngredientsBtn.addEventListener("click", addIngredients);
