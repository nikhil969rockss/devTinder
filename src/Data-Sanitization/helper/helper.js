
const validator = require("validator")
const validateSignup = (req)=>{
  const {firstName, lastName,email,password,photoURL}= req.body;
  if(!firstName){
    throw new Error("First name is required between 3-50 characters ")
  }
  if(!email ){
    throw new Error("Email is required")
  }
  if(!validator.isEmail(email)){
  throw new Error ("Invalid email address")
  } 
  if(!password){
    throw new Error("Password is required")
  }
  if(!validator.isStrongPassword(password)){
    throw new Error("Password should between 8-50 characters and should contain at least one Uppercase, one Lowercase, one number, one special character")
  }
  if(photoURL&& !validator.isURL(photoURL)){
    throw new Error("Invalid URL")
  }
}
const validateUpdate =(req)=>{
  const {password,photoURL}=req.body
  if(password&& !validator.isStrongPassword(password)){
    throw new Error("Password should between 8-50 characters and should contain at least one Uppercase, one Lowercase, one number, one special character")
  }
if(photoURL&& !validator.isURL(photoURL)){
  throw new Error("Invalid URL")
  
}

}
module.exports ={
  validateSignup,validateUpdate
}