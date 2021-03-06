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
  $('.user-toggle').removeClass('hidden');
  $('.home-toggle').removeClass('hidden');
  $('.changePassword').removeClass('hidden');
  $('.signOut').removeClass('hidden');
  $('.user-email').text(data.user.email);
  $('.first-window').addClass('hidden');
  console.log(data);
};

const changePasswordSuccess = (data) => {
  $('.signUp').hide();
  $('.signIn').hide();
  $('.sign-up-window').addClass('hidden');
  $('.sign-in-window').addClass('hidden');
  $('.change-password-window').addClass('hidden');
  $('.user-toggle').removeClass('hidden');
  $('.home-toggle').removeClass('hidden');
  $('.changePassword').removeClass('hidden');
  $('.signOut').removeClass('hidden');
  $('.user-email').text(data.user.email);
  $('.first-window').addClass('hidden');
  console.log(data);
};

const signOutSuccess = () => {
  $('.signUp').show();
  $('.signIn').show();
  $('.user-toggle').addClass('hidden');
  $('.home-toggle').addClass('hidden');
  $('.changePassword').addClass('hidden');
  $('.signOut').addClass('hidden');
  $('.first-window').removeClass('hidden');
  $('#sign-up-email').val("");
  $('#sign-up-pw').val("");
  $('#sign-up-pw-retype').val("");
  $('#sign-in-email').val("");
  $('#sign-in-pw').val("");
  $('#old-pw').val("");
  $('#new-pw').val("");
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
