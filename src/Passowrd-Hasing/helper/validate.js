const validator = require('validator')

const SignupValidations = (req)=>{
  const{firstName,lastName,email,password,age,gender,photoURL,description,skills} = req.body
 

if(email&&!validator.isEmail(email)){
  throw new Error("Invalid email")
}
if(password && !validator.isStrongPassword(password)){
  throw new Error("Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character")
}
if(photoURL &&!validator.isURL(photoURL)){
  throw new Error("Invalid URL")
}
if(gender && !['male','female','others'].includes(gender.toLowerCase())){
  throw new Error("Gender should be either 'male', 'female' or 'others'")
}
if(age&& age<18){
  throw new Error("Age should be at least 18 to Signup")
}

}

module.exports ={
  SignupValidations
}