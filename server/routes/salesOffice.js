const express = require('express')
const sof = require('../controllers/salesOfficeController')
const auth = require('../middleware/authJWT')
const router = express.Router()

router.get('/generaljournal', auth.authenticateJWT,auth.salesOfficerAuthorization, sof.getGeneralJournal)

router.get('/generalledger', auth.authenticateJWT,auth.salesOfficerAuthorization, sof.getGeneralLedger)

router.get('/incomestatement', auth.authenticateJWT, auth.salesOfficerAuthorization, sof.getIncomeStatement)

router.get('/invoice', auth.authenticateJWT, auth.salesOfficerAuthorization, sof.getInvoice)

router.get('/purchaseorder', auth.authenticateJWT,auth.salesOfficerAuthorization, sof.getPurchaseOrder)

router.get('/inventory', auth.authenticateJWT,auth.salesOfficerAuthorization, sof.getInventory)

module.exports = router