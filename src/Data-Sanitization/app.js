require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const connectToDb = require('./DbConnection')
const User = require("./UserSchema")
const {validateSignup,validateUpdate} = require("./helper/helper")

const URI = process.env.DATA_BASE_URI;



connectToDb(URI).then(()=>{
  console.log(`connection to Database successfully established`);
  app.listen(port, ()=>console.log(`Server is listening on PORT ---> ${port}`))

}).catch(err =>console.error(err));

app.use(express.json())

app.post("/Signup",async(req,res)=>{
  try{
    validateSignup(req)
    const {firstName, lastName, gender,age,email,password,photoURL,skills,description} = req.body;

    const user = new User({firstName, lastName, gender, age, email, password, photoURL, skills,description})

    await user.save()
    

    res.send("User created successfully");
    

  }
  catch(error){
    res.status(400).send("ERROR "+error.message)
  }


  
})

app.patch("/user/:userID",async(req,res)=>{
  //This is the patch request for allowing user to update all fields except (email and age)



  //check if the entry of changes is acceptable or not
try {

  const userID = req.params.userID;
  if(!userID){
    return res.status(400).send("User ID is required in the URL")
  }
  validateUpdate(req)

  const allowedUpdate = ["firstName", "lastName","photoURL","skills","description","gender","password"];

  const updateRequest = req.body
 
  const isAllowedUpdate = Object.keys(updateRequest).every(keys => allowedUpdate.includes(keys))

  if(!isAllowedUpdate) {
    throw new Error ("Operation is not allowed")
  }
  else {
   

    const updatedUser = await User.findByIdAndUpdate(userID,updateRequest,{runValidators: true,returnDocument:"after"})
    res.send("Updated user successfully" + updatedUser)
  }

 
  
} catch (error) {
  res.status(400).send("Error "+error.message);
}

})
