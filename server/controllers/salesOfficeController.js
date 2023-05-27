const db = require('../services/dbconnection')
const helper = require('../helper')
const config = require('../config')

const getGeneralJournal = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const search = req.query.search || ""
  const haveSearch = false
  if(search == ""){
    haveSearch = false
  } else {
    haveSearch = true
  }
  const offset = helper.getOffset(page, config.listPerPage)
  const rows = ""
  if(haveSearch == false){
    rows = await db.query(`select * from generaljournal limit ${offset}, ${config.listPerPage}`)
  } else {
    rows = await db.query(`select * from generaljournal where date = '${search}' limit ${offset}, ${config.listPerPage}`)
  }
  
  const data = helper.emptyOrRows(rows)
  const meta = {page}

  return res.status(200).json({status: 200, data: data, meta: meta})
  
}

const getGeneralLedger = async (req, res) => { 
  const page = parseInt(req.query.page) || 1
  const search = req.query.search || ""
  const haveSearch = false
  if(search == ""){
    haveSearch = false
  } else {
    haveSearch = true
  }
  const offset = helper.getOffset(page, config.listPerPage)
  const rows = ""
  if(haveSearch == false){
    rows = await db.query(`select * from generalledger limit ${offset}, ${config.listPerPage}`)
  } else {
    rows = await db.query(`select * from generalledger where date = '${search}' limit ${offset}, ${config.listPerPage}`)
  }
  
  const data = helper.emptyOrRows(rows)
  const meta = {page}

  return res.status(200).json({status: 200, data: data, meta: meta})
}

const getIncomeStatement = async(req, res) => {
  const sql = 'select * from incomestatement'
  const data = await db.query(sql)
  return res.status(200).json({status: 200, data: data})
}

const getInvoice= async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const search = req.query.search || ""
  const haveSearch = false
  if(search == ""){
    haveSearch = false
  } else {
    haveSearch = true
  }
  const offset = helper.getOffset(page, config.listPerPage)
  const rows = ""
  if(haveSearch == false){
    rows = await db.query(`select * from invoice limit ${offset}, ${config.listPerPage}`)
  } else {
    rows = await db.query(`select * from invoice where date = ${search} limit ${offset}, ${config.listPerPage}`)
  }
  
  const data = helper.emptyOrRows(rows)
  const meta = {page}

  return res.status(200).json({status: 200, data: data, meta: meta})
}

const getPurchaseOrder = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const search = req.query.search || ""
  const haveSearch = false
  if(search == ""){
    haveSearch = false
  } else {
    haveSearch = true
  }
  const offset = helper.getOffset(page, config.listPerPage)
  const rows = ""
  if(haveSearch == false){
    rows = await db.query(`select * from purchaseorder limit ${offset}, ${config.listPerPage}`)
  } else {
    rows = await db.query(`select * from purchaseorder where date = ${search} limit ${offset}, ${config.listPerPage}`)
  }
  
  const data = helper.emptyOrRows(rows)
  const meta = {page}

  return res.status(200).json({status: 200, data: data, meta: meta})
}

const getInventory = async (req, res) => {
  const rows = await db.query(`select * from inventory`)
  const data = helper.emptyOrRows(rows)

  return res.status(200).json({status: 200, data: data})
}

module.exports = {
  getGeneralJournal,
  getGeneralLedger,
  getIncomeStatement,
  getInvoice,
  getPurchaseOrder,
  getInventory
}