const db = require('../services/dbconnection')
const helper = require('../helper')
const config = require('../config')

const getAllGeneralJournal = async (req, res) => {
  const page = 1
  const offset = helper.getOffset(page, config.listPerPage)
  const rows = await db.query(`select * from generaljournal limit ${offset}, ${config.listPerPage}`)
  const data = helper.emptyOrRows(rows)
  const meta = {page}

  return res.status(200).json({status: 200, data: data, meta: meta})
  
}

const getAllGeneralLedger = async (req, res) => { 
  const page = 1
  const offset = helper.getOffset(page, config.listPerPage)
  const rows = await db.query(`select * from generalledger limit ${offset}, ${config.listPerPage}`)
  const data = helper.emptyOrRows(rows)
  const meta = {page}

  return res.status(200).json({status: 200, data: data, meta: meta})
}

const getAllIncomeStatement = async(req, res) => {
  const sql = 'select * from incomestatement'
  const data = await db.query(sql)
  return res.status(200).json({status: 200, data: data})
}

const getAllInvoice= async (req, res) => {
  const page = 1
  const offset = helper.getOffset(page, config.listPerPage)
  const rows = await db.query(`select * from invoice limit ${offset}, ${config.listPerPage}`)
  const data = helper.emptyOrRows(rows)
  const meta = {page}

  return res.status(200).json({status: 200, data: data, meta: meta})
}

const getAllPurchaseOrder = async (req, res) => {
  const page = 1
  const offset = helper.getOffset(page, config.listPerPage)
  const rows = await db.query(`select * from purchaseorder limit ${offset}, ${config.listPerPage}`)
  const data = helper.emptyOrRows(rows)
  const meta = {page}

  return res.status(200).json({status: 200, data: data, meta: meta})
}

const getAllInventory = async (req, res) => {
  const page = 1
  const offset = helper.getOffset(page, config.listPerPage)
  const rows = await db.query(`select * from inventory limit ${offset}, ${config.listPerPage}`)
  const data = helper.emptyOrRows(rows)
  const meta = {page}

  return res.status(200).json({status: 200, data: data, meta: meta})
}

module.exports = {
  getAllGeneralJournal,
  getAllGeneralLedger,
  getAllIncomeStatement,
  getAllInvoice,
  getAllPurchaseOrder,
  getAllInventory
}