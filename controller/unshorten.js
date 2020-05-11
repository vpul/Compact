const createError = require('http-errors');
const Url = require('../models/url');

module.exports = async (req, res, next) => {
  try {
    const result = await Url.findById(req.params.alias);
    if (result) {
      res.redirect(result.fullUrl);
    } else {
      next(createError(404, 'The page you requested does not exist'));
    }
  } catch (err) {
    next(err);
  }
};
