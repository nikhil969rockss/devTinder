const validator = require('validator')

const userValidations =(req)=>{
  const{ firstName, lastName, email, password, age,gender,photURl,description,skills}=req.body


  if(email&& !validator.isEmail(email)){
    throw new Error("Invalid email")
  }
  if(password && !validator.isStrongPassword(password)){
    
    throw new Error("Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character")
  }
  if(age&& age<18){
    throw new Error("Age should be at least 18 to Signup")
  }
  if(photURl && !validator.isURL(photURl)){
    throw new Error("Invalid URL")
  }

}

module.exports = userValidations;