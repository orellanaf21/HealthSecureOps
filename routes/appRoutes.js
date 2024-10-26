const express = require('express');

const router = express.Router();
const controller = require('../controllers/appController');

//GET /information: send all items to the user
router.get('/', controller.index);

//GET /information/accessCode: send user to accessCode page
router.get('/accessCode', controller.enterAccessCode);

module.exports = router;