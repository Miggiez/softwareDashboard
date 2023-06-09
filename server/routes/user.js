const express = require('express')
const user = require('../controllers/userController')
const auth = require('../middleware/authJWT')
const router = express.Router();

router.post('/createuser', auth.authenticateJWT, auth.adminAuthorization, user.registerEmployee)

router.post('/login', user.loginEmployee)

router.get('/profile', auth.authenticateJWT, user.userProfile)  

module.exports = router;