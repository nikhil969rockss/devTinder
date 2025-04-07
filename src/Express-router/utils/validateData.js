const { sign } = require('jsonwebtoken');
const validator = require('validator');
const validateData =(req,signIn)=>{
const {email,password,photoURL,description,age,gender,skills} = req.body

if(email && !validator.isEmail(email)){
  throw new Error("Invalid email")
}



if(signIn){
if(password && !validator.isStrongPassword(password)){
 
  throw new Error("Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character")
}
else {
  throw new Error("Invalid credentials")
}}
if(photoURL && !validator.isURL(photoURL)){
throw new Error("Invalid photo URL")
}
if(description&&description.length>200 ){
  throw new Error("Description should not exceed 200 characters")
}
if(age&&age.length<18 ){
  throw new Error("age should at least 18")
}
if(gender &&!['male','female','others'].includes(gender.toLowerCase())){
  throw new Error("Gender should be either 'male', 'female' or 'others'")
}
if(skills&& skills.length>15)
{
  throw new Error("Skills should not exceed 15")
}}

module.exports = validateData;

