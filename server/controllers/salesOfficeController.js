const db = require('../services/dbconnection')
const helper = require('../helper')
const config = require('../config')

const getGeneralJournal = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const search = req.query.search || ""
  let haveSearch = false
  if(search == ""){
    haveSearch = false
  } else {
    haveSearch = true
  }
  const offset = helper.getOffset(page, config.listPerPage)
  let rows = ""
  if(haveSearch == false){
    rows = await db.query(`select * from generaljournal limit ${offset}, ${config.listPerPage}`)
  } else {
    rows = await db.query(`select * from generaljournal where date regexp "${search}" limit ${offset}, ${config.listPerPage}`)
  }
  
  const data = helper.emptyOrRows(rows)
  const meta = {page}

  return res.status(200).json({status: 200, data: data, meta: meta})
  
}

const getGeneralLedger = async (req, res) => { 
  const page = parseInt(req.query.page) || 1
  const search = req.query.search || ""
  let haveSearch = false
  if(search == ""){
    haveSearch = false
  } else {
    haveSearch = true
  }
  const offset = helper.getOffset(page, config.listPerPage)
  let rows = ""
  if(haveSearch == true) {
    rows = await db.query(`select * from generalledger where expname = '${search}'`)
  }
  const data = helper.emptyOrRows(rows)

  return res.status(200).json({status: 200, data: data})
}

const getIncomeStatement = async(req, res) => {
  const sql = 'select * from incomestatement'
  const data = await db.query(sql)
  return res.status(200).json({status: 200, data: data})
}

const getInvoice= async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const search = req.query.search || ""
  let haveSearch = false
  if(search == ""){
    haveSearch = false
  } else {
    haveSearch = true
  }
  const offset = helper.getOffset(page, config.listPerPage)
  let rows = ""
  if(haveSearch == true){
    rows = await db.query(`select * from invoice inner join customer on invoice.customerid = customer.customerid where ponumber = '${search}'`)
  }

  const data = helper.emptyOrRows(rows)

  return res.status(200).json({status: 200, data: data})
}

const getPurchaseOrder = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const search = req.query.search || ""
  let haveSearch = false
  if(search == ""){
    haveSearch = false
  } else {
    haveSearch = true
  }
  const offset = helper.getOffset(page, config.listPerPage)
  let rows = ""
  if(haveSearch == true){
    rows = await db.query(`select * from purchaseorder inner join customer on purchaseorder.customerid = customer.customerid where ponumber = '${search}'`)
  }

  const data = helper.emptyOrRows(rows)

  return res.status(200).json({status: 200, data: data})
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