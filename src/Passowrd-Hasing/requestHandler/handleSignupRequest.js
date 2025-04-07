
const {SignupValidations} = require('../helper/validate')
const User = require('../userSchema')
const bcrypt = require('bcrypt')

const handleSignup = async(req,res)=>{
 
 try{ SignupValidations(req)
  const {password,firstName,lastName,email,age,gender,photoURL,skills,description}= req.body
  const hashedPassword =  await bcrypt.hash(password,10)
  const user = new User({
    firstName,
    lastName,
    email,
    age,
    gender,
    photoURL,
    skills,
    description,
    password: hashedPassword,
  })
  await user.save()
  res.send("User created successfully" + user)


 }catch(error){
  res.status(400).send("ERROR: "+ error.message)
 }

}

module.exports = handleSignup