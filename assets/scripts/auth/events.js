'use strict';
//
const getFormFields = require('../../../lib/get-form-fields');

const api = require('./api');
const ui = require('./ui');

const onShowSignUp = () => {
  $('.first-window').addClass('hidden');
  $('.sign-in-window').addClass('hidden');
  $('.sign-up-window').removeClass('hidden');
};

const onShowSignIn = () => {
  $('.first-window').addClass('hidden');
  $('.sign-up-window').addClass('hidden');
  $('.sign-in-window').removeClass('hidden');
};

const onShowCP = () => {
  $('.first-window').addClass('hidden');
  $('.sign-out-window').addClass('hidden');
  $('.recipe-content').addClass('hidden');
  $('.change-password-window').removeClass('hidden');
};

// const onShowSignOut = () => {
//   $('.first-window').addClass('hidden');
//   $('.change-password-window').addClass('hidden');
//   $('.recipe-content').addClass('hidden');
//   $('.sign-out-window').removeClass('hidden');
// };

const onSignUp = (event) => {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.signUp(data)
  .done(ui.signUpSuccess)
  .fail(ui.failure);
};

const onSignIn = (event) => {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.signIn(data)
  .done(ui.signInSuccess)
  .fail(ui.failure);
};

const onSignOut = (event) => {
  $('.first-window').addClass('hidden');
  $('.change-password-window').addClass('hidden');
  $('.recipe-content').addClass('hidden');
  $('.sign-out-window').removeClass('hidden');
  event.preventDefault();
  api.signOut()
  .done(ui.signOutSuccess)
  .fail(ui.failure);
};

const onChangePassword = (event) => {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.changePassword(data)
  .done(ui.changePasswordSuccess)
  .fail(ui.failure);
};

const addHandlers = () => {
  $('.signUp').on('click', onShowSignUp);
  $('.signIn').on('click', onShowSignIn);
  $('.changePassword').on('click', onShowCP);
  $('#sign-out').on('click', onSignOut);
  $('#sign-up').on('submit', onSignUp);
  $('#sign-in').on('submit', onSignIn);
  $('#change-password').on('submit', onChangePassword);
};

module.exports = {
  addHandlers,
};
