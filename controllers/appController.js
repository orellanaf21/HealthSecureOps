const model = require('../models/information');
//const {upload} = require('./fileUpload');

exports.index = (req, res, next) => {
    let searchQuery = req.query.search;

    model.find(searchCriteria)
    .sort({ price: 1 })  // Sort by price as before
    .then(items => res.render('./item/items', { items }))
    .catch(err => next(err));
};