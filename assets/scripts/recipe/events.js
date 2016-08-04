'use strict';

const getFormFields = require('../../../lib/get-form-fields');

const api = require('./api');
const ui = require('./ui');

let stepCount = 1;
const onAddSteps = () => {
  let stepNumber = stepCount.toString();
  $( ".instructions-input" ).append( '<input class="input-field" type="text" name="recipe[instructions][' +stepNumber+ ']" placeholder="instruction step"><br>');
  stepCount++;
};

let ingredientCount = 1;
const onAddIngredients = () => {
  let ingredientNumber = ingredientCount.toString();
  $( ".ingredients-input" ).append( '<input class="input-field" type="text" name="recipe[ingredients][' +ingredientNumber+ ']" placeholder="ingredients"><br >');
  ingredientCount++;
};

const convertObjectToArry = (obj) => {
  return $.map(obj, function(val,i){
    return [val];
  });
};

// const onUpload = (event) => {
//   event.preventDefault();
//   let data = new FormData(event.target);
//
//   console.log(data);
//   api.editRecipe(data, 1)
//   .done(ui.createCreateSuccess)
//   .fail(ui.failure);
// };
// const onArrRecipe = ()

const onCreateRecipe = (event) => {
  event.preventDefault();
  let data = getFormFields(event.target);
  data.recipe.instructions = convertObjectToArry(data.recipe.instructions);
  data.recipe.ingredients = convertObjectToArry(data.recipe.ingredients);
  api.createRecipe(data)
  .then(ui.addRecipeSuccess)
  .catch(error=>console.error);
};

const onEditRecipe = (event) => {
  event.preventDefault();
  let data = getFormFields(event.target);
  data.recipe.instructions = convertObjectToArry(data.recipe.instructions);
  data.recipe.ingredients = convertObjectToArry(data.recipe.ingredients);
  let allUserRecipes = ui.getRecipeInfo();
  for(let i = 0; i<allUserRecipes.length; i++) {
    let userRecipe = allUserRecipes[i];
    if(userRecipe.name===data.recipe.name){
      console.log(userRecipe);
      api.editRecipe(data, userRecipe.id)
      .done(ui.createCreateSuccess)
      .fail(ui.failure);
    }
  }
};

const onUserRecipe = () => {
  event.preventDefault();
  $('.recipe-content').removeClass('hidden');
  $('#favorite-tab').addClass('hidden');
  $('#make-recipe-tab').removeClass('hidden');
  $('#make-recipe-content').removeClass('hidden');
  $('#edit-recipe-tab').removeClass('hidden');
  api.getAllRecipes()
   .done(ui.getUserRecipeSuccess)
   .fail(ui.failure);
};

const onHomeRecipe = (event) => {
  event.preventDefault();
  $('.recipe-content').removeClass('hidden');
  $('#favorite-tab').removeClass('hidden');
  $('#make-recipe-tab').addClass('hidden');
  $('#edit-recipe-tab').addClass('hidden');
  api.getAllRecipes()
   .done(ui.getHomeRecipeSuccess)
   .fail(ui.failure);
};

const onFavoriteRecipe = (event) => {
  event.preventDefault();
  $('.favorite-recipe-content').text("");
  api.getLikeRecipe()
   .done(ui.getLikeRecipeSuccess)
   .fail(ui.failure);
};


const addHandlers = () => {
  $('.user-toggle').on('click', onUserRecipe);
  $('.home-toggle').on('click', onHomeRecipe);
  $('#add-another-step').on('click', onAddSteps);
  $('#add-another-ingredient').on('click', onAddIngredients);
  // $('#photo-upload').on('submit', onUpload);
  $('#recipe-fillout').on('submit', onCreateRecipe);
  $('#favorite-tab').on('click', onFavoriteRecipe);
  $('#add-another-step-edit').on('click', onAddSteps);
  $('#add-another-ingredient-edit').on('click', onAddIngredients);
  $('#recipe-fillout-edit').on('submit', onEditRecipe);
};


module.exports = {
  addHandlers,
};
