const router = require('express').Router();
const shorten = require('../controller/shorten');
const unshorten = require('../controller/unshorten');

router.post('/shorten', shorten);
router.get('/:alias', unshorten);

module.exports = router;
