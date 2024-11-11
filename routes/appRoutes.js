const express = require('express');

const router = express.Router();
const controller = require('../controllers/appController');

//GET /information: send all items to the user
router.get('/', controller.index);

//GET /information/accessCode: send user to accessCode page
router.get('/accessCode', controller.enterAccessCode);

// Show login form
router.get('/login', controller.showLogin);

// Handle login form submission
router.post('/', controller.login);

router.get('/currentThreats', controller.showCurrentThreats);

router.get('/loggedIncidents', controller.showLoggedIncidents);

router.get('/reccomendedMeasures', controller.showRecommendedMeasures);

module.exports = router;