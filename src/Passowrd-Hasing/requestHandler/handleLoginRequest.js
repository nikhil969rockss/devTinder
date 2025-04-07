const bcrypt = require('bcrypt')
const validator = require('validator')
const User = require('../userSchema')
const handleLogin =async(req,res)=>{
  
  try{
    const {email,password}= req.body

    const user = await User.findOne({email})
    if(!user){
      throw new Error ("Invalid email")
    }else {
      const passwordHash = user.password
      const isPasswordValid = await bcrypt.compare(password,passwordHash)

      if(!isPasswordValid){
        throw new Error ("Invalid password")
      }
      else {
        res.send("Login successful" + user)
      }
    }


}catch(error){
    res.status(400).send('ERROR '+error.message)
  }

 


}

module.exports = handleLogin