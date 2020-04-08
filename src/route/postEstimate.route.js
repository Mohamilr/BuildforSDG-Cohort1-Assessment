const { Router } = require('express');
const postEstimate = require('../controller/postEstimate');

const router = Router();

router.post('/on-covid-19', postEstimate);

module.exports = router;
