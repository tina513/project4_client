'use strict';

const app = require('../app.js');
const signInApi = require('./signInApi.js');

const signUpSuccess = (data) => {
  console.log(data);
  let password = $('#sign-up-pw').val();
  signInApi.autoSignIn(data.user.email, password)
    .done(signInSuccess)
    .fail(failure);
};

const signInSuccess = (data) => {
  app.user = data.user;
  $('.signUp').hide();
  $('.signIn').hide();
  $('.sign-up-window').addClass('hidden');
  $('.sign-in-window').addClass('hidden');
  $('.user-info').show();
  $('.user-toggle').removeClass('hidden');
  $('.home-toggle').removeClass('hidden');
  $('.changePassword').removeClass('hidden');
  $('.signOut').removeClass('hidden');
  $('.user-email').text(data.user.email);
  $('.first-window').addClass('hidden');
  console.log('Success');
};

const changePasswordSuccess = (data) => {
  if (data) {
    console.log(data);
  } else {
    console.log('Success');
  }
};

const signOutSuccess = () => {
  $('.signUp').show();
  $('.signIn').show();
  $('.user-info').hide();
  $('.search-flight-content').text('');
  $('.future-flight-content').text('');
  $('.past-flight-content').text('');
  console.log('User signed out successfully');
};

const failure = (error) => {
  console.error(error);
};

module.exports = {
  signUpSuccess,
  signInSuccess,
  changePasswordSuccess,
  signOutSuccess,
  failure,
};
