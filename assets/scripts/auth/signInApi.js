'use strict';

const app = require('../app.js');

const autoSignIn = (email, password) => {
  return $.ajax({
    url: app.host + '/sign-in',
    method: "POST",
    data: {
      credentials: {
          email,
          password,
      },
    },
  });
};


module.exports = {
  autoSignIn,
};
