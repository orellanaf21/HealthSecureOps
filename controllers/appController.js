const model = require('../models/logCase');
//const {upload} = require('./fileUpload');

exports.index = (req, res, next) => {
    let searchQuery = req.query.search;

    model.find()
    .then(cases => res.render('index', { cases }))
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

exports.showForms = (req, res, next) => {
    res.render('./application/forms');
};

exports.showCases = (req, res, next) => {
    model.find()
    .then(cases => res.render('./application/checkCases', {cases}))
    .catch(err=>next(err));
}

exports.createCase = [
    (req, res, next) => {
        let logCase = new model(req.body);
        logCase.save()
        .then((cases) => {
            res.redirect('/information/checkCases');
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                err.status = 400;
            }
            next(err);
        });
    }
];