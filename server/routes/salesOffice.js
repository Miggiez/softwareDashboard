const express = require('express')
const sof = require('../controllers/salesOfficeController')
const auth = require('../middleware/authJWT')
const router = express.Router()

router.get('/generaljournal', auth.authenticateJWT,auth.salesOfficerAuthorization, sof.getAllGeneralJournal)

router.get('/generalledger', auth.authenticateJWT,auth.salesOfficerAuthorization, sof.getAllGeneralLedger)

router.get('/incomestatement', auth.authenticateJWT, auth.salesOfficerAuthorization, sof.getAllIncomeStatement)

router.get('/invoice', auth.authenticateJWT, auth.salesOfficerAuthorization, sof.getAllInvoice)

router.get('/purchaseorder', auth.authenticateJWT,auth.salesOfficerAuthorization, sof.getAllPurchaseOrder)

router.get('/inventory', auth.authenticateJWT,auth.salesOfficerAuthorization, sof.getAllInventory)

module.exports = router