var express = require('express');
var router = express.Router();

var urlShortController = require('../controllers/urlShortController');


router.post('/', urlShortController.urlShort);
router.get('/:shorturl', urlShortController.urlRedirect);

module.exports = router;
