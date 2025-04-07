const validator = require('validator');
const User = require('../userSchema')


const handleLogin =async(req,res)=>{
  //validating email and password
try{


  const{email,password} =req.body;
  if(email && !validator.isEmail(email)){
    throw new Error("Invalid email")
  }
  const user = await User.findOne({email})
  console.log(user);
  if(!user){
    throw new Error ("Invalid credentials")
  }
  else{
    const isPasswordMatched = await user.comparePassword(password)
    console.log(isPasswordMatched);

    if(!isPasswordMatched){
      throw new Error ("Invalid credentials")
    }
    else{
      const token = await user.generateJWT()
      res.cookie("token",token)
      res.json({message: "User logged in successfully"})
    }

  }




}catch(error){
  return res.status(400).send({error: error.message})
}



}


module.exports = handleLogin;