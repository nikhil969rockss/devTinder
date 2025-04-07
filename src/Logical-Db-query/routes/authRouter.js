const express = require('express')
const authRouter = express.Router()
const {validateInputs,validateLoginInputs} = require('../middlewares/validateInputs')
const User = require('../Schemas/userSchema')


authRouter.post('/signup', validateInputs, async (req,res)=>{
  try {
    const allowedFieldsToSubmit = ['firstName','lastName','email','password','age','gender','photoURL','description','skills']

    if(!Object.keys(req.body).every(keys => allowedFieldsToSubmit.includes(keys))){
      throw new Error("Invalid field(s)")

    }
    // check if user already exists
    const existingUser = await User.findOne({email:req.body.email})
    if(existingUser){
      throw new Error("This email is already exists")
    }
   
    const user = await new User(req.body)

    //password hashing
    const hashedPassword = await user.generatePasswordHash()
    user.password = hashedPassword;

    // generating JWT token
    const token = await user.generateJWT()
    res.cookie("token",token,{expires: new Date(Date.now()+24*3600000)})// sending cookie

    await user.save()

    res.json({message: "User saved successfully" })



  } catch (error) {
    return res.status(400).send({message: error.message})
  }
})

authRouter.post('/login',validateLoginInputs,async(req,res)=>{
  try {
    const {email,password} = req.body
    const user = await User.findOne({email: email})
    if(!user){
      throw new Error ("Invalid email")
    }
   const isPasswordMatched = await user.comparePassword(password)
   if(!isPasswordMatched){
      throw new Error ("Invalid credentials")
    }
    const token = await user.generateJWT()
    res.cookie("token",token,{expires: new Date(Date.now()+24*3600000)})// sending cookie
    res.json({message: "User logged in successfully!!"})

    
  } catch (error) {
    return res.status(400).send({message: error.message})
  }
})

authRouter.post('/logout',async(req,res)=>{
  res.clearCookie("token")
  res.json({message: "User logged out successfully"})

})

module.exports = authRouter