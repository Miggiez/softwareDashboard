const db = require('../services/dbconnection')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const salt = 10

let refreshTokens = []

const registerEmployee = async (req,res) => {
  const {firstname, lastname, password, email, role, address, phonenumber} = req.body
  const userid = uuid.v4()
  const checkEmail = await db.query(`select * from user where email = '${email}'`)
  if(checkEmail.length == 0){
    bcrypt.hash(password.toString(),salt, (err,hash) => {
      if(err) return res.status(400).json({status: 400, message: err})
      const sql = `insert into user (userid, firstname, lastname, email, password, role, address, phonenumber) values ('${userid}', '${firstname}','${lastname}', '${email}', '${hash}', '${role}', '${address}', '${phonenumber}')`
      db.query(sql)
    })
    return res.status(200).json({status: 200, message: "You have created user succesfully"})
  } else {
    return res.status(400).json({status: 400, error: "There is already an existing email"})
  }
}
 
const loginEmployee = (req,res) => {
  const {email, password} = req.body
  const sql = `select * from user where email = '${email}'`
  db.query(sql).then((data) => {
    if(data.length > 0){
      bcrypt.compare(password.toString(),data[0].password, (err, response) => {
        if(err) return res.status(400).json({status: 400, error: "Bcrypt comparison error"})
        if(response) {
          const token = jwt.sign({id: data[0].userid, email: data[0].email, role: data[0].role}, process.env.JWTSECRET)
          const refreshToken = jwt.sign({id: data[0].userid, email: data[0].email, role: data[0].role}, process.env.REFJWTSECRET, {expiresIn: '1y'})
          refreshTokens.push(refreshToken)
          return res.status(200).json({status: 200, token: token,refToken: refreshToken,message: "You have been successfully authenticated"})
        } else {
          return res.status(400).json({status: 400, error: "Your password is incorrect"})
        }
      }) 
    } else {
      return res.status(400).json({status: 400, error: "Email doesn't exist"})
    }
  }).catch((err) => {
    return res.status(400).json({status: 400, error: err})
  })
}

const userProfile = (req, res) => {
  const {id} = req.user
  const sql = `select * from user where userid = '${id}'`
  db.query(sql).then((data) => {
    if(data.length > 0 ){
      return res.status(200).json({status: 200, data: data, message: "Successfully get user"})
    } else {
      return res.status(400).json({status: 400, error: "There is no user with this id"})
    }
  }).catch((err) => {
    return res.status(500).json({status: 500, error: "Internal server error"})
  })
}

// const tokenGenerator = async (req, res) => {
//   const refreshToken = req.header("x-auth-token")

//   if(!refreshToken){
//     res.status(401).json({error: "Token not found"})
//   }

//   if(!refreshTokens.includes(refreshToken)){
//     res.status(403).json({error: "Invalid refresh token"})
//   }

//   try {
//     const user = await jwt.verify(refreshToken, process.env.REFJWTSECRET)
//     const {id, email, role} = user
//     const token = await jwt.sign({id, email, role}, process.env.JWTSECRET, {expiresIn: '15m'})
//     res.status(200).json({status: 200, token: token})
//   } catch(error) {
//     res.status(403).json({status: 403, error: "Invalid Token"})
//   }
// }

// const logout = (req, res) => {
//   const refreshToken = req.header('x-auth-token')
//   refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
  
//   res.sendStatus(204)
// }

module.exports = {
  registerEmployee,
  loginEmployee,
  userProfile,
}
