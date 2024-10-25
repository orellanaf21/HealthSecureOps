const express = require('express');

const router = express.Router();
const controller = require('../controllers/appController');

//GET /information: send all items to the user
router.get('/', controller.index);

module.exports = router;