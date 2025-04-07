const jwt = require('jsonwebtoken');
const User = require('../userSchema')
const handleProfile= async(req,res)=>{
  try{const {token} = req.cookies;// reading cookies form the request
  if(!token){
    throw new Error("Token Expired, Please Login again.")
  }

const decodedMessage = await jwt.verify(token,"PrivateKEY@99")// parsing cookie hidden code through jwt
const {userID}= decodedMessage;
const user = await User.findById(userID) //finding user in the database

if(!user){
  throw new Error("User not found")
}
else{
res.json({data: user})
}



  
}catch(error){
  res.status(401).send({error: error.message})

}
}

module.exports=handleProfile;