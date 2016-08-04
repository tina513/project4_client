'use strict';

const app = require('../app.js');
const extraRecipeApi = require('./extraRecipeApi.js');

let allUserRecipes = [];

const failure = (error) => {
  console.error(error);
};

const addRecipeSuccess = (data) => {
  console.log("success!");
  $('.upload').addClass(`${data.id}`);
};

const createRecipeSuccess = () => {
  console.log("success!");
};

const addLike = (data) => {
  $('#add-like-' + data.id.toString()).on('click', function(){
    let recipeId = $('#like-recipe-'+data.id.toString()).val();
    extraRecipeApi.addLikeRecipe(recipeId)
    .done(createRecipeSuccess)
    .fail(failure);
  });
};

const addDel = (data) => {
  $('#del-recipe-' + data.id.toString()).on('click', function(){
    let recipeId = $('#delete-recipe-'+data.id.toString()).val();
    extraRecipeApi.deleteRecipe(recipeId)
    .done(createRecipeSuccess)
    .fail(failure);
  });
};

const switchCategoryOnHome = (each) => {
  let homeRecipeListing = require('../templates/homeRecipes.handlebars');
  switch (each.category.toLowerCase()) {
    case "grill":
      console.log(each.category);
      $('.grill-recipe-content').append(homeRecipeListing(each));
      addLike(each);
      break;
    case "fry":
      console.log(each.category);
      $('.fry-recipe-content').append(homeRecipeListing(each));
      addLike(each);
      break;
    case "bake":
      console.log(each.category);
      $('.bake-recipe-content').append(homeRecipeListing(each));
      addLike(each);
      break;
    case "stir-fry":
      $('.stir-fry-recipe-content').append(homeRecipeListing(each));
      addLike(each);
      break;
    case "steam":
      $('.steam-recipe-content').append(homeRecipeListing(each));
      addLike(each);
      break;
  }
};

const switchCategoryOnUser = (each) => {
  let userRecipeListing = require('../templates/userRecipes.handlebars');
  switch (each.category.toLowerCase()) {
    case "grill":
      console.log(each.category);
      $('.grill-recipe-content').append(userRecipeListing(each));
      addDel(each);
      break;
    case "fry":
      console.log(each.category);
      $('.fry-recipe-content').append(userRecipeListing(each));
      addDel(each);
      break;
    case "bake":
      console.log(each.category);
      $('.bake-recipe-content').append(userRecipeListing(each));
      addDel(each);
      break;
    case "stir-fry":
      $('.stir-fry-recipe-content').append(userRecipeListing(each));
      addDel(each);
      break;
    case "steam":
      $('.steam-recipe-content').append(userRecipeListing(each));
      addDel(each);
      break;
  }
};

const getUserRecipeSuccess = (data) => {
  let editRecipeListing = require('../templates/editRecipe.handlebars');
  $('.home-content').text("");
  let recipeArr = data.recipes;
  for (let i = 0; i < recipeArr.length; i++) {
    let each = recipeArr[i];
    if (each.user_id === app.user.id) {
      allUserRecipes.push(each);
      console.log(each.name);
      switchCategoryOnUser(each);
      $('.edit-field').append(editRecipeListing(each));
    }
  }
};

const getHomeRecipeSuccess = (data) => {
  $('.home-content').text("");
  let recipeArr = data.recipes;
  for (let i = 0; i < recipeArr.length; i++) {
    let each = recipeArr[i];
    if (each.user_id !== app.user.id) {
      console.log(each.category);
      switchCategoryOnHome(each);
    }
  }
};

const getLikeRecipeSuccess = (data) => {
  let recipeArr = data.like_recipes;
  for (let i = 0; i < recipeArr.length; i++) {
    let each = recipeArr[i];
    if (each.user_id === app.user.id) {
      console.log(each.recipe_id);
      extraRecipeApi.getLikeRecipes(each.recipe_id)
      .done(likeRecipeSuccess)
      .fail(failure);
    }
  }
};

const likeRecipeSuccess = (data) => {
  let likeRecipeListing = require('../templates/likeRecipe.handlebars');
  console.log(data);
  $('.favorite-recipe-content').append(likeRecipeListing(data.recipe));
};

const getRecipeInfo = () => {
  return allUserRecipes;
};

module.exports = {
  failure,
  createRecipeSuccess,
  getUserRecipeSuccess,
  getHomeRecipeSuccess,
  getLikeRecipeSuccess,
  likeRecipeSuccess,
  getRecipeInfo,
};
