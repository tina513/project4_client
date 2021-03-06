'use strict';

const app = require('../app.js');

const createRecipe = (data) => {
   return $.ajax({
     url: app.host + '/recipes',
     method: "POST",
     data: data,
     headers: {
       Authorization: 'Token token=' + app.user.token,
     }
  });
};

const editRecipe = (data, id) => {
  return $.ajax({
    url: app.host + '/recipes/'+ id,
    method: "PATCH",
    data: data,
    headers: {
      Authorization: 'Token token=' + app.user.token,
    }
  });
};

const getAllRecipes = () => {
  return $.ajax({
      url: app.host + `/recipes`,
      method: 'GET',
      headers: {
        Authorization: 'Token token=' + app.user.token,
      },
    });
};

const getLikeRecipe = () => {
  return $.ajax({
      url: app.host + `/like_recipes`,
      method: 'GET',
      headers: {
        Authorization: 'Token token=' + app.user.token,
      },
    });
};


module.exports = {
  createRecipe,
  editRecipe,
  getAllRecipes,
  getLikeRecipe,
};
