/**
 * Dependencies installed
 */
const express = require('express'),
router = express.Router();

router.get('./products', (request, response) => {
  response.send('API is working');
});

module.exports = router;