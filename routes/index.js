const router = require('express').Router();
const shorten = require('../controller/shorten');
// const unshorten = require('../controller/unshorten');

router.post('/shorten', shorten);
// router.post('/:id', unshorten);

module.exports = router;
