const express = require('express')
const userAuth = require('../middlewares/userAuth')
const validator = require('validator')
const validateData = require('../utils/validateData')
const getHashedPassword = require('../utils/hashingPassword')



const profileRouter = express.Router()

profileRouter.get('/profile', userAuth,async(req,res)=>{
  try {
    const user = req.user
    res.json({message: `${user.firstName} your profile data 👇`, data: user})
  } catch (error) {
    return res.status(400).send({error: error.message})
    
  }
})

profileRouter.patch('/profile/edit',userAuth ,async(req,res)=>{
  try {
    validateData(req,signIn=false)
    const user =req.user
    const allowedUpdateFields =['firstName','lastName','age','gender','description','skills']
    const isUpdateAllowed = Object.keys(req.body).every(key => allowedUpdateFields.includes(key))
   

    if(!isUpdateAllowed){
      return res.status(400).send({error: 'Invalid update field(s)'})
    }
    Object.keys(req.body).forEach(key=>user[key] =req.body[key])
    await user.save()
    res.json({message: 'Profile updated successfully', data: user})

   
    
  } catch (error) {
    return res.status(400).send({error: error.message})
    
  }
})

profileRouter.patch('/profile/edit/password',userAuth,async(req,res)=>{
  try {
    const allowedFields =['oldPassword','newPassword']
    if(!Object.keys(req.body).every(key =>allowedFields.includes(key))){
      return res.status(400).send({error: 'Invalid update field(s)'})
    }
    const user =req.user
    const { oldPassword,newPassword } = req.body;
    if(!oldPassword){
      throw new Error("Old password is required")
    }
    if(!newPassword){
      throw new Error("New password is required")
    }
    if(!validator.isStrongPassword(newPassword)){
      throw new Error("Password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character")
    }
    const isPasswordMatched = user.comparePassword(oldPassword)
    if(!isPasswordMatched){
      throw new Error ("Old password is incorrect")
    }
    const newPasswordHash = await getHashedPassword(newPassword)

    user.password = newPasswordHash
    await user.save()
    res.json({message: 'Password updated successfully'})


    
  } catch (error) {
    return res.status(400).send({error: error.message})
  }
})


module.exports = profileRouter