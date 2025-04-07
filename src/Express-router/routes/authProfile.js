const express = require('express');
const validateData = require('../utils/validateData')
const getHashedPassword = require('../utils/hashingPassword')
const User = require('../userSchema')
const validator = require('validator')

const authProfileRouter = express.Router()

authProfileRouter.post('/signup', async(req,res)=>{
  try {
    validateData(req);
    const {firstName, lastName, email, password,age,gender,photoURL,description,skills} = req.body

    const hashedPassword = await getHashedPassword(password)

    const user = await new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      age,
      gender,
      photoURL,
      description,
      skills,
    }) 
    await user.save()
    const token = await user.generateJWT()
    res.cookie("token",token,{expires: new Date(Date.now()+24*3600000)})

    res.json({status: "User saved Successfully"})


    
    
  
  } catch (error) {
    return res.status(400).send({error: error.message})
  }
  

})

authProfileRouter.post('/login', async(req,res)=>{

  try {
    
    const {email, password} = req.body;
    if(email && !validator.isEmail(email)){
      throw new Error("Invalid email")
}
  const user = await User.findOne({email: email}) 
  if(!user){
    throw new Error ("User not found")
  }
  const isPasswordMatched = await user.comparePassword(password)
  if(!isPasswordMatched){
    throw new Error ("Invalid credentials")
  }
  
  const token = await user.generateJWT() //generating JWT token
  res.cookie("token",token,{expires: new Date(Date.now()+24*3600000)})// sending cookie
  res.json({message: "User logged in successfully"})
    
    
  } catch (error) {
    return res.status(400).send({error: error.message})
    
  }

})

authProfileRouter.post('/logout',async(req,res)=>{
  res.clearCookie("token")
  res.json({message: "User logged out successfully"})
})
module.exports = authProfileRouter;