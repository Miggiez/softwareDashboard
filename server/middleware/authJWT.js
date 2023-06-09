const jwt = require('jsonwebtoken')

const authenticateJWT = (req, res, next) => {
  const token = req.header("x-auth-token")
  if (token) {
      jwt.verify(token, process.env.JWTSECRET, (err, user) => {
          if (err) {
              return res.status(403).json({status: 403, error: "There are some problems with the token"});
          }
          req.user = user;
          next();
      });
  } else {
    return res.status(401).json({status: 401, error: "You are not authenticated"});
  }
};

const adminAuthorization = (req, res, next) => {
  const {role} = req.user
  if(role != "admin"){
    return res.status(401).json({status: 401, error: "You are not authorized"})
  } else {
    next()
  }
}

const operatorAuthorization = (req,res,next) => {
  const {role} = req.user
  if(role == "operator" || role == "admin"){
    next()
  } else {
    return res.status(401).json({status: 401, error: "You are not authorized"})
  }
}

const salesOfficerAuthorization = (req,res,next) => {
  const {role} = req.user
  if(role=="sales officer"||role=="admin"){
    next()
  } else {
    return res.status(401).json({status: 401, error: "You are not authorized"})
  }
}

module.exports = {
  authenticateJWT,
  operatorAuthorization,
  salesOfficerAuthorization,
  adminAuthorization
}