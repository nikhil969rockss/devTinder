const express = require('express'); 
const app =express();
const connectToDB = require('./DbConnection')
const PORT = 3005;
const User = require('./models/UserSchema')
const URI = process.env.DATA_BASE_URI;

connectToDB(URI).then(()=>{
  app.listen(PORT,()=>console.log(`Your server is running on PORT-> ${PORT}`))
  console.log(`Connected to Database Successfully!!!!!!!!`);
}).catch(error=>console.log(`Could not connect to Database: ${error.message}`))

app.use(express.json())

app.post("/signup",async(req,res,next)=>{
  const newUser = req.body;
 const user = new User(newUser)
try {
  await user.save()
  res.send("User created successfully")
  
} catch (error) {
  res.status(400).send("Unable to save user: "+error.message)
  
}

})
