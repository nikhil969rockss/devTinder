const express = require('express');
const profileRouter = express.Router();
const userAuthLogin = require('../middlewares/userAuthLogin')
const validator = require('validator')

profileRouter.get("/profile", userAuthLogin, async(req,res,next)=>{
  try {
    const user = req.user;
    res.send({message: `Welcome ${user.firstName} your profile data 👇`,
      data: user})
    
  } catch (error) {
    return res.status(400).send({error: error.message});
  }
})

profileRouter.patch('/profile/edit', userAuthLogin, async(req,res)=>{
  try {
   
    const allowedFieldsUpdates = ['firstName','lastName','age','description','photoURL','skills']
    if(!Object.keys(req.body).every(key=>allowedFieldsUpdates.includes(key))){
      return res.status(400).send({error: 'Invalid update field(s)'})
    }
    const user = req.user
    Object.keys(req.body).forEach(key=>user[key]= req.body[key])
    await user.save()
    res.json({message: 'Profile updated successfully', data: user})
    
    
  } catch (error) {
    return res.status(400).send({error: error.message});
  }

})

profileRouter.patch('/profile/edit/password',userAuthLogin,async(req,res)=>{
  try {
    const user = req.user
    const allowedFieldsUpdates = ['oldPassword','newPassword']
    if(!Object.keys(req.body).every(key=>allowedFieldsUpdates.includes(key))){
      return res.status(400).send({error: 'Invalid update field(s)'})
    }
    const {oldPassword, newPassword} = req.body
    if(!oldPassword){
      throw new Error("Old password is required")
    }
    if(!newPassword){
      throw new Error("New password is required ")
    }
    if(!validator.isStrongPassword(newPassword)){
      throw new Error("New Password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character")
    }
    const isPasswordMatched = await user.comparePassword(oldPassword)
    if(!isPasswordMatched){
      throw new Error ("Old password is incorrect")
    }
    user.password = newPassword
    //creating new hash for new password
    const newHashedPassword = await user.generatePasswordHash()
    user.password = newHashedPassword
    await user.save()
   
    await user.save()
    res.json({message: 'Password updated successfully'})
    
    
  } catch (error) {
    return res.status(400).send({error: error.message});
  }
})

module.exports = profileRouter