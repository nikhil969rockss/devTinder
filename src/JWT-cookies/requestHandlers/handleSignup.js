const userValidations = require('../helpers/userValidations')
const bcrypt = require('bcrypt')
const User = require('../userSchema')
const handleSignup =async(req,res)=>{
  
  try{userValidations(req) //validating the user
  const {firstName,lastName,email,password,age,gender,description,skills}=req.body

  const hashPassword = await bcrypt.hash(password, 10) //hashing the password
  const user = new User({firstName,lastName,email,password:hashPassword,
    age,gender,description,skills
  })// creating the new user
  const {_id}=user
 
  await user.save() //saving the user into DB
  const jwtToken = await user.generateJWT() //generating JWT token
  
  res.cookie("token",jwtToken) //sending cookie with JWT token

  res.json({message: "User saved successfully" })

}catch(error){
    return res.status(400).send({error: error.message})
  }
}


module.exports = handleSignup;