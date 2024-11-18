const model = require('../models/logCase');
//const {upload} = require('./fileUpload');

exports.index = (req, res, next) => {
    model.find()
        .then(cases => res.render('./index', { cases }))
        .catch(err => next(err));
};

exports.enterAccessCode = (req, res) => {
    res.render('./application/accessCode');
};

// Render the login page
exports.showLogin = (req, res) => {
    res.render('./application/login');
};

exports.login = (req, res, next) => {
    const { username, password } = req.body;

    const sampleUsername = 'user123';
    const samplePassword = 'password';

    if (username === sampleUsername && password === samplePassword) {
        req.session.loggedIn = true;

        model.find()
            .then(cases => res.render('./index', { cases }))
            .catch(err => next(err));
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
    let searchQuery = req.query.search?.trim() || '';
    let searchCriteria = searchQuery
        ? {
            $or: [
                { caseTitle: { $regex: searchQuery, $options: 'i' } },
                { details: { $regex: searchQuery, $options: 'i' } }
            ]
        }
        : {}; // Match all cases if no search query

    model.find(searchCriteria)
        .then(cases => res.render('./application/checkCases', { cases }))
        .catch(err => next(err));
};

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

exports.resolveCase = (req, res, next) => {
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid item id');
        err.status = 400;
        return next(err);
    }

    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(cases => {
        if(cases) {
            res.redirect('/information/checkCases');
        } else {
            let err = new Error('Cannot find an item with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};