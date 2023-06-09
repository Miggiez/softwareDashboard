const express = require('express')
const operate = require('../controllers/operationController')
const router = express.Router();
const auth = require('../middleware/authJWT')

/* GET programming languages. */
router.get("/daily", auth.authenticateJWT,auth.operatorAuthorization,operate.getDailyKPI)
router.get("/weekly", auth.authenticateJWT,auth.adminAuthorization, operate.getWeeklyKPI)
router.get("/tracking", auth.authenticateJWT, auth.adminAuthorization, operate.getTracking)

module.exports = router;