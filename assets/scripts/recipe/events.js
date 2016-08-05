'use strict';

const getFormFields = require('../../../lib/get-form-fields');

const api = require('./api');
const ui = require('./ui');

let stepCountMake = 1;
const onAddStepsMake = () => {
  let stepNumberMake = stepCountMake.toString();
  $( ".instructions-input-make" ).append( '<textarea rows="2" cols="24" class="input-field" type="text" name="recipe[instructions][' +stepNumberMake+ ']" placeholder="instruction step"></textarea>');
  stepCountMake++;
};

let ingredientCountMake = 1;
const onAddIngredientsMake = () => {
  let ingredientNumberMake = ingredientCountMake.toString();
  $( ".ingredients-input-make" ).append( '<textarea rows="2" cols="24" class="input-field" type="text" name="recipe[ingredients][' +ingredientNumberMake+ ']" placeholder="ingredients"></textarea>');
  ingredientCountMake++;
};

let stepCountEdit = 1;
const onAddStepsEdit = () => {
  let stepNumberEdit = stepCountEdit.toString();
  $( ".instructions-input-edit" ).append( '<textarea rows="2" cols="24" class="input-field" type="text" name="recipe[instructions][' +stepNumberEdit+ ']" placeholder="instruction step"></textarea>');
  stepCountEdit++;
};

let ingredientCountEdit = 1;
const onAddIngredientsEdit = () => {
  let ingredientNumberEdit = ingredientCountEdit.toString();
  $( ".ingredients-input-edit" ).append( '<textarea rows="2" cols="24" class="input-field" type="text" name="recipe[ingredients][' +ingredientNumberEdit+ ']" placeholder="ingredients"></textarea>');
  ingredientCountEdit++;
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
  .done(ui.addRecipeSuccess)
  .fail(ui.failure);
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
      .done(ui.createRecipeSuccess)
      .fail(ui.failure);
    }
  }
};

const onUserRecipe = () => {
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
  // $('.tab-content').empty("");
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
  $('#add-another-step-make').on('click', onAddStepsMake);
  $('#add-another-ingredient-make').on('click', onAddIngredientsMake);
  // $('#photo-upload').on('submit', onUpload);
  $('#recipe-fillout').on('submit', onCreateRecipe);
  $('#favorite-tab').on('click', onFavoriteRecipe);
  $('#add-another-step-edit').on('click', onAddStepsEdit);
  $('#add-another-ingredient-edit').on('click', onAddIngredientsEdit);
  $('#recipe-fillout-edit').on('submit', onEditRecipe);
};


module.exports = {
  onHomeRecipe,
  onUserRecipe,
  addHandlers,
};
