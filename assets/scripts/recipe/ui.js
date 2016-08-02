'use strict';

const app = require('../app.js');
const addRecipeApi = require('./addLikeRecipeApi.js');

// let tripArr = [];

const failure = (error) => {
  console.error(error);
};

const createRecipeSuccess = () => {
  console.log("success!");
};

const getUserRecipeSuccess = (data) => {
  let userRecipeListing = require('../templates/userRecipe.handlebars');
  let recipeArr = data.recipes;
  for (let i = 0; i < recipeArr.length; i++) {
    let each = recipeArr[i];
    if (each.user_id === app.user.id) {
    //  console.log(each);
      $('.user-recipe-content').append(userRecipeListing(each));
    }
  }
};

const getHomeRecipeSuccess = (data) => {
  $('.home-content').text("");
  let homeRecipeListing = require('../templates/homeRecipe.handlebars');
  let recipeArr = data.recipes;
  for (let i = 0; i < recipeArr.length; i++) {
    let each = recipeArr[i];
    if (each.user_id !== app.user.id) {
      console.log(each.category);
      switch (each.category.toLowerCase()) {
        case "grill":
          console.log(each.category);
          $('.grill-recipe-content').append(homeRecipeListing(each));
          $('#add-like-' + each.id.toString()).on('click', function(){
            let recipeId = $('#like-recipe-'+each.id.toString()).val();
            addRecipeApi.addLikeRecipe(recipeId)
            .done(createRecipeSuccess)
            .fail(failure);
          });
          break;
        case "fry":
          console.log(each.category);
          $('.fry-recipe-content').append(homeRecipeListing(each));
          $('#add-like-' + each.id.toString()).on('click', function(){
            let recipeId = $('#like-recipe-'+each.id.toString()).val();
            addRecipeApi.addLikeRecipe(recipeId)
            .done(createRecipeSuccess)
            .fail(failure);
          });
          break;
        case "bake":
          console.log(each.category);
          $('.bake-recipe-content').append(homeRecipeListing(each));
          $('#add-like-' + each.id.toString()).on('click', function(){
            let recipeId = $('#like-recipe-'+each.id.toString()).val();
            console.log(recipeId);
            addRecipeApi.addLikeRecipe(recipeId)
            .done(createRecipeSuccess)
            .fail(failure);
          });
          break;
        case "stir-fry":
          $('.stir-fry-recipe-content').append(homeRecipeListing(each));
          $('#add-like-' + each.id.toString()).on('click', function(){
            let recipeId = $('#like-recipe-'+each.id.toString()).val();
            addRecipeApi.addLikeRecipe(recipeId)
            .done(createRecipeSuccess)
            .fail(failure);
          });
          break;
        case "steam":
          $('.steam-recipe-content').append(homeRecipeListing(each));
          $('#add-like-' + each.id.toString()).on('click', function(){
            let recipeId = $('#like-recipe-'+each.id.toString()).val();
            addRecipeApi.addLikeRecipe(recipeId)
            .done(createRecipeSuccess)
            .fail(failure);
          });
          break;
      }
      // $('.home-recipe-content').append(homeRecipeListing(each));
    }
  }
};

const getLikeRecipeSuccess = (data) => {
  //console.log(data);
  let recipeArr = data.like_recipes;
  for (let i = 0; i < recipeArr.length; i++) {
    let each = recipeArr[i];
    if (each.user_id === app.user.id) {
      console.log(each.recipe_id);
      addRecipeApi.getLikeRecipes(each.recipe_id)
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
// const getFutureFlightSuccess = (data) => {
//   let tripListing = require('../templates/trip.handlebars');
//   let weatherListing = require('../templates/weather.handlebars');
//   let userId = app.user.id;
//   tripArr = data.trips;
//   for (let i = 0; i < tripArr.length; i++) {
//     let each = tripArr[i];
//     let departureDate = new Date(each.flight.departure_date);
//     let today = new Date();
//     if ((each.user.id === userId) && (departureDate >= today)) {
//       $('.future-flight-content').append(tripListing(each.flight));
//       $('#weather-' + each.flight.id.toString()).on('click', function(){
//         addTripApi.addWeather(each.flight.arrival)
//         .done(function(data){
//           $('.weather-container-'+ each.flight.id.toString()).text('');
//           $('.weather-container-'+ each.flight.id.toString()).append(weatherListing(data.query));
//         })
//         .fail(failure);
//       });
//     }
//   }
// };
//
// const getPastFlightSuccess = (data) => {
//   let tripListing = require('../templates/trip.handlebars');
//   let weatherListing = require('../templates/weather.handlebars');
//   let userId = app.user.id;
//   tripArr = data.trips;
//   for (let i = 0; i < tripArr.length; i++) {
//     let each = tripArr[i];
//     let departureDate = new Date(each.flight.departure_date);
//     let today = new Date();
//     if ((each.user.id === userId) && (departureDate < today)) {
//       $('.past-flight-content').append(tripListing(each.flight));
//       $('#weather-' + each.flight.id.toString()).on('click', function(){
//         addTripApi.addWeather(each.flight.arrival)
//         .done(function(data){
//           $('.weather-container-'+ each.flight.id.toString()).text('');
//           $('.weather-container-'+ each.flight.id.toString()).append(weatherListing(data.query));
//         })
//         .fail(failure);
//       });
//     }
//   }
// };
//
// const updateFlightsuccess = () => {
//   console.log("success!");
//   $('.input-field').val('');
// };
//
// const deleteSuccess = () => {
//   console.log("success!");
//   $('.input-field').val('');
//   $('.search-flight-content').text('');
//   $('.future-flight-content').text('');
//   $('.past-flight-content').text('');
// };
//
// const searchSuccess = (data) => {
//   let searchFlightListing = require('../templates/searchFlight.handlebars');
//   let typeFlightNumber = $('#search-flight-number').val();
//   let flightArr = data.flights;
//   for (let i = 0; i < flightArr.length; i++) {
//     let each = flightArr[i];
//     if (each.flight_number === typeFlightNumber){
//       $('.search-flight-content').append(searchFlightListing(each));
//       $('#add-trip-' + each.id.toString()).on('click', function(){
//         let flightId = $('#trip-flight-'+each.id.toString()).val();
//         addTripApi.addFlight(flightId)
//         .done(createFlightSuccess)
//         .fail(failure);
//       });
//     }
//   }
// };
//
//
// const returnTripsArr = () => {
//   return tripArr;
// };

module.exports = {
  failure,
  createRecipeSuccess,
  getUserRecipeSuccess,
  getHomeRecipeSuccess,
  getLikeRecipeSuccess,
  likeRecipeSuccess,
  // getFutureFlightSuccess,
  // getPastFlightSuccess,
  // updateFlightsuccess,
  // deleteSuccess,
  // searchSuccess,
  // returnTripsArr,
};
