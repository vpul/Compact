const createError = require('http-errors');
const Url = require('../models/url');

module.exports = async (req, res, next) => {
  let result;
  try {
    if (req.body.customAlias) {
      // for custom alias
      const recordExistsWithAlias = await Url.findById(req.body.id);
      if (recordExistsWithAlias) {
        return next(
          createError(
            400,
            `Alias ${req.body.id} is unavailable. Please choose another one.`,
          ),
        );
      }
      result = await Url.create(req.body);
    } else {
      const recordExistsWithSameURL = await Url.findOne({
        fullUrl: req.body.fullUrl.toLowerCase(),
      });
      if (recordExistsWithSameURL) {
        result = recordExistsWithSameURL;
      } else {
        result = await Url.create(req.body);
      }
    }

    return res.status(201).json({
      status: 'success',
      payload: result,
    });
  } catch (err) {
    next(err);
  }
};
