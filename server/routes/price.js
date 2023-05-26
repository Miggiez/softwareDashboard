const express = require('express')
const price = require('../services/price')
const router = express.Router();

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await price.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting the prices `, err.message);
    next(err);
  }
});

module.exports = router;