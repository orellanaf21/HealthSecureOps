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