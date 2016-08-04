'use strict';

// user require with a reference to bundle the file and use it in this file
// let example = require('./example');

const authEvents = require('./auth/events.js');
const recipeEvents = require('./recipe/events.js');
const paperMixingBowl = require('./paperAnimation/mixingBowl.js');
const paperGrill = require('./paperAnimation/grill.js');

// On document ready
$(() => {
 paper.install(window);
 authEvents.addHandlers();
 recipeEvents.addHandlers();
 paperMixingBowl.addHandlers();
 paperGrill.addHandlers();
});
