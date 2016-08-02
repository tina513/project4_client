'use strict';
//
const getFormFields = require('../../../lib/get-form-fields');

const api = require('./api');
const ui = require('./ui');

let stepCount = 1;
const onAddSteps = () => {
  let stepNumber = stepCount.toString();
  $( "#instructions-input" ).append( '<input class="input-field" type="text" name="recipe[instructions][' +stepNumber+ ']" placeholder="instruction step"><br>');
  stepCount++;
};

let ingredientCount = 1;
const onAddIngredients = () => {
  let ingredientNumber = ingredientCount.toString();
  $( "#ingredients-input" ).append( '<input class="input-field" type="text" name="recipe[ingredients][' +ingredientNumber+ ']" placeholder="ingredients"><br >');
  ingredientCount++;
};

const convertObjectToArry = (obj) => {
  return $.map(obj, function(val,i){
    return [val];
  });
};

const onCreateRecipe = (event) => {
  event.preventDefault();
  let data = getFormFields(event.target);
  data.recipe.instructions = convertObjectToArry(data.recipe.instructions);
  data.recipe.ingredients = convertObjectToArry(data.recipe.ingredients);
  api.createRecipe(data)
  .done(ui.createCreateSuccess)
  .fail(ui.failure);
};

const onMakeRecipe = (event) => {
  event.preventDefault();
  $('.user-recipe-content').addClass('hidden');
  $('.make-recipe-div').removeClass('hidden');
};

const onCheckRecipe = (event) => {
  event.preventDefault();
  $('.make-recipe-div').addClass('hidden');
  $('.user-recipe-content').removeClass('hidden');
  $('.user-recipe-content').text("");
  api.getUserRecipe()
   .done(ui.getUserRecipeSuccess)
   .fail(ui.failure);
};

const onUserRecipe = () => {
  $('.user-choice').removeClass('hidden');
};

const onHomeRecipe = (event) => {
  event.preventDefault();
  $('.user-choice').addClass('hidden');
  $('.user-recipe-content').text("");
  //$('.home-recipe-content').text("");
  api.getHomeRecipe()
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
// const onPastFlight = (event) => {
//   $('.search-flight-content').text('');
//   $('.future-flight-content').text('');
//   $('.past-flight-content').text('');
//   event.preventDefault();
//   api.getFlight()
//   .done(ui.getPastFlightSuccess)
//   .fail(ui.failure);
// };
//
// const onEditFlight = (event) => {
//   event.preventDefault();
//   let data = getFormFields(event.target);
//   console.log(data);
//   api.updateFlight(data)
//   .done(ui.updateFlightsuccess)
//   .fail(ui.failure);
// };
//
// const onDeleteFlight = (event) => {
//   event.preventDefault();
//   let data = getFormFields(event.target);
//   api.deleteFlight(data)
//   .done(ui.deleteSuccess)
//   .fail(ui.failure);
// };
//
// const onSearchFlight = (event) => {
//   $('.search-flight-content').text('');
//   $('.future-flight-content').text('');
//   $('.past-flight-content').text('');
//   event.preventDefault();
//   let data = getFormFields(event.target);
//   console.log(data);
//   api.searchFlight(data)
//   .done(ui.searchSuccess)
//   .fail(ui.failure);
// };

const addHandlers = () => {
  $('.user-toggle').on('click', onUserRecipe);
  $('.home-toggle').on('click', onHomeRecipe);
  $('.make-recipe-button').on('click', onMakeRecipe);
  $('.check-recipe-button').on('click', onCheckRecipe);
  $('#add-another-step').on('click', onAddSteps);
  $('#add-another-ingredient').on('click', onAddIngredients);
  $('#recipe-fillout').on('submit', onCreateRecipe);
  $('#favorite-tab').on('click', onFavoriteRecipe);
  // $('#future-flight').on('click', onFutureFlight);
  // $('#past-flight').on('click', onPastFlight);
  // $('#edit-flight-content').on('submit', onEditFlight);
  // $('#delete-flight').on('submit', onDeleteFlight);
  // $('#search-flight').on('submit', onSearchFlight);
};


module.exports = {
  addHandlers,
};
