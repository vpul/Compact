const createError = require('http-errors');
const Url = require('../models/url');

const createWithAlias = async ({ alias, url }) => {
  const recordWithAlias = await Url.findById(alias);
  if (recordWithAlias) {
    if (recordWithAlias.fullUrl === url) {
      return recordWithAlias;
    }
    return createError(
      400,
      `Alias '${alias}' is unavailable. Please choose another one.`,
    );
  }
  const result = await Url.create({
    _id: alias,
    fullUrl: url,
  });
  return result;
};

module.exports = async (req, res, next) => {
  let result;
  try {
    if (req.body.alias) {
      // for custom alias
      result = await createWithAlias(req.body);
    } else {
      const recordWithURL = await Url.findOne({
        fullUrl: req.body.url.toLowerCase(),
      });
      if (recordWithURL) {
        result = recordWithURL;
      } else {
        result = await Url.create({ fullUrl: req.body.url });
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
