const { Router } = require('express');
const xmlParser = require('express-xml-bodyparser');
const postEstimate = require('../controller/postEstimate');
const estimateMiddleware = require('../middleware/post.middleware');

const options = {
  charkey: 'value',
  trim: false,
  explicitRoot: false,
  explicitArray: false,
  normalizeTags: false,
  mergeAttrs: true
};

const router = Router();

router.post('/on-covid-19', estimateMiddleware.jsonMiddleware, postEstimate.postJson);
router.post('/on-covid-19/json', estimateMiddleware.jsonMiddleware, postEstimate.postJson);
router.post('/on-covid-19/xml', xmlParser(options), estimateMiddleware.xmlMiddleware, postEstimate.postXml);

module.exports = router;
