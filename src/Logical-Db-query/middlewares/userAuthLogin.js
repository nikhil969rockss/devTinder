const jwt = require('jsonwebtoken');
const User = require('../Schemas/userSchema')
const userAuthLogin = async(req,res,next)=>{
  const {token} = req.cookies
  if(!token){
    return res.status(400).send({error: "Token expired, kindly please login"})

  }
  const {userID}= await jwt.verify(token,"PrivateKEY@99")
  const user = await User.findById(userID)

  if(!user){
    return res.status(400).send({error: "Please Sign in"})
  }
  req.user = user
  next()
}

module.exports = userAuthLogin