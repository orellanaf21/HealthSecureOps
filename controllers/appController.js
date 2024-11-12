const model = require('../models/information');
//const {upload} = require('./fileUpload');

exports.index = (req, res, next) => {
    let searchQuery = req.query.search;

    model.find()
    .then(items => res.render('index', { items }))
    .catch(err => next(err));
};

exports.enterAccessCode = (req, res) => {
    res.render('./application/accessCode');
};

// Render the login page
exports.showLogin = (req, res) => {
    res.render('./application/login');
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    const sampleUsername = 'user123';
    const samplePassword = 'password';

    if (username === sampleUsername && password === samplePassword) {
        // Set session variable to indicate user is logged in
        req.session.loggedIn = true;
        res.render('./index');
    } else {
        res.render('./application/login', { error: 'Invalid username or password' });
    }
};

exports.showCurrentThreats = (req, res, next) => {
    res.render('./application/currentThreats');
};

exports.showLoggedIncidents = (req, res, next) => {
    res.render('./application/loggedIncidents');
};

exports.showRecommendedMeasures = (req, res, next) => {
    res.render('./application/reccomendedMeasures');
};