/**
 * Dependencies installed
 */
import express from 'express';

const router = express.Router();

router.get('./products', (request, response) => {
  response.send('API is working');
});

export default router;
