const validator = require('validator')


const validateInputs = (req,res,next)=>{
const {email, password, photoURL, age}= req.body;




if(email&& !validator.isEmail(email)){
  return res.status(400).send("Invalid email")
}
if(password && !validator.isStrongPassword(password)){
  return res.status(400).send("Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character")
}
if(photoURL &&!validator.isURL(photoURL)){
  return res.status(400).send("Invalid URL")
}
if(age&& age<18){
  return res.status(400).send("Age should be at least 18 to Signup")
}
next();
}
const validateLoginInputs = (req,res,next)=>{
  const {email, password} =  req.body
  if(!email){
    return res.status(400).send("Please Enter Email")
  }
  if(!password){
    return res.status(400).send("Please Enter Password")
  }
  if( email && !validator.isEmail(email)){
    return res.status(400).send("Invalid Email")
  }
  next();
}

const validatePatchInputs = (req,res,next)=>{
  
}

module.exports = {validateInputs,validateLoginInputs}