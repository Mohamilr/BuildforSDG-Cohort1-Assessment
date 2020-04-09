const { Router } = require('express');
const postEstimate = require('../controller/postEstimate');
const postMiddleware = require('../middleware/post.middleware');

const router = Router();

router.post('/on-covid-19', postEstimate);

module.exports = router;
