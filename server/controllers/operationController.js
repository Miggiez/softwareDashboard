const db = require('../services/dbconnection')
const helper = require('../helper')

const getDailyKPI = async(req,res) => {
  const search = req.query.search || ""
  let haveSearch = false
  if(search == ""){
    haveSearch = false
  } else {
    haveSearch = true
  }

  let rows = ""
  if(haveSearch == true){
    rows = await db.query(`select * from dailykpi where date regexp "${search}"`)
  }

  const data = helper.emptyOrRows(rows)

  return res.status(200).json({status: 200, data: data})
}

const getWeeklyKPI = async(req, res) => {
  const search = req.query.search || ""
  let haveSearch = false
  if(search == ""){
    haveSearch = false
  } else {
    haveSearch = true
  }

  let rows = ""
  if(haveSearch == true){
    rows = await db.query(`select * from weeklykpi where date = "${search}"`)
  }

  const data = helper.emptyOrRows(rows)

  return res.status(200).json({status: 200, data: data})

}

const getTracking = async(req, res) => {
  const search = req.query.search || ""
  const date = req.query.date || ""
  let haveSearch = false
  if(search == "" && date == ""){
    haveSearch = false
  } else {
    haveSearch = true
  }

  let rows = ""
  let rows2 = ""
  let rows3 = ""
  let rows4 = ""
  if(haveSearch == true){
    rows = await db.query(`select * from salesoffice where vehiclenumber = "${search}" and arrivaltime regexp "${date}"`)
    rows2 = await db.query(`select * from bay where vehiclenumber = "${search}" and arrivaltime regexp "${date}"`)
    rows3 = await db.query(`select * from weightbound where vehiclenumber = "${search}" and arrivaltime regexp "${date}" and wbtype = "outbound"`)
    rows4 = await db.query(`select * from weightbound where vehiclenumber = "${search}" and arrivaltime regexp "${date}" and wbtype = "inbound"`)
  }

  const sales = helper.emptyOrRows(rows)
  const type = helper.emptyOrRows(rows2)
  const wbout = helper.emptyOrRows(rows3)
  const wbin = helper.emptyOrRows(rows4)

  return res.status(200).json({status: 200, data: {sales, type, wbout, wbin}})

}


module.exports = {
  getDailyKPI,
  getWeeklyKPI,
  getTracking
}