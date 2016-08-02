'use strict';

const app = require('../app.js');

const addLikeRecipe = (recipeId) => {
  return $.ajax({
    url: app.host + '/like_recipes',
    method: "POST",
    data: {
      like_recipe: {
        user_id: app.user.id,
        recipe_id: recipeId,
      },
    },
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
   });
};

const getLikeRecipes = (recipeId) => {
  return $.ajax({
    url: app.host + '/recipes/' + recipeId,
    method: "GET",
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
   });
};

module.exports = {
  addLikeRecipe,
  getLikeRecipes,
};
