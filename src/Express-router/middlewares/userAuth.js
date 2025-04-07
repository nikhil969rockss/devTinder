const jwt = require('jsonwebtoken');
const User = require('../userSchema');
const userAuth =async(req,res,next)=>{
  const { token } = req.cookies
  if(!token){
    return res.send("Token Expired kindly please login again")
  }
  const { userID} = await jwt.verify(token, "PrivateKEY@99")
  const user = await User.findById(userID)
 
  if(!user){
    return res.send ("User not found")
  }
  req.user = user
  next()
  
}

module.exports = userAuth