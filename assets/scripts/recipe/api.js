'use strict';

const app = require('../app.js');
const ui = require('./ui.js');

const createRecipe = (data) => {
  return $.ajax({
    url: app.host + '/recipes',
    method: "POST",
    data: data,
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
};

const getUserRecipe = () => {
  return $.ajax({
      url: app.host + `/recipes`,
      method: 'GET',
      headers: {
        Authorization: 'Token token=' + app.user.token,
      },
    });
};

const getHomeRecipe = () => {
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

// const updateRecipe = (data) => {
//   return $.ajax({
//         url: app.host + `/recipes/` + data.recipe.id,
//         method: 'PATCH',
//         data: data,
//         headers: {
//           Authorization: 'Token token=' + app.user.token,
//        },
//    });
//  };
//
// const deleteRcipe = (data) => {
//   return $.ajax({
//       url: app.host + '/recipes/' + data.recipe.id,
//       method: "DELETE",
//       headers: {
//           Authorization: 'Token token=' + app.user.token,
//       },
//     });
// };

// const searchFlight = (data) => {
//   return $.ajax({
//       url: app.host + '/flights',
//       method: 'GET',
//       headers: {
//         Authorization: 'Token token=' + app.user.token,
//       },
//     });
// };

module.exports = {
  createRecipe,
  getUserRecipe,
  getHomeRecipe,
  getLikeRecipe,
  // updateRecipe,
  // deleteRcipe,
  // searchFlight,
};
