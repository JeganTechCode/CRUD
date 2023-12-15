
const jwt = require('jsonwebtoken');
const config = require('../config/config')
const adminCollection = require("../module/adminschema");
const { Log } = require('ethers');
 

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
 
  if (!token) {
    return res.send({ status: false, message: 'No token provided' });
  }
  const bearer = token.split(" ");
  const bearerToken = bearer[1];
    // console.log("bearerToken",bearerToken);
  jwt.verify(bearerToken, config.JWT_SECRET, async(err, decoded) => {
    if (err) {
      return res.send({ status: false, message: 'Failed to authenticate token' });
    }
    // console.log("decoded",decoded);
    let adminStatus = await adminCollection.findOne({_id:decoded.id})
    
    if(adminStatus){
        res.locals.admin_id = adminStatus._id;
        next();
    }else{
        return res.send({ status: false, message: 'session expired' });
    }
  });
}

module.exports = verifyToken;