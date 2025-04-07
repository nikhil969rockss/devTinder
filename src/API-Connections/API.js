const express =require('express')
const app = express();
const connectToDB = require('./DBConnection')
const User = require('./UserSchema')

const port = 3000;
const URI = "mongodb+srv://nikhil969work:Y8haIdnS6DfY93vy@learnmongo.1ubda.mongodb.net/devTInder"

connectToDB(URI).then(()=>{
console.log(`Database connection established`);
app.listen(port,()=>console.log(`Server is listening on port ${port}`));
}).catch(error=>{
  console.log(`Could not connect to Database: ${error.message}`);
})

app.use(express.json())

app.post("/user", async(req,res)=>{
  const newUser = req.body;
  const user = new User(newUser);
  try {
    await user.save();
    res.send("User added successfully")
  } catch (error) {
    res.status(400).send("Error saving user")
    
  }

})

app.get("/user", async(req,res)=>{
  const requestedEmail = req.body.emailId;
  try {
   const user = await User.findOne({emailId: requestedEmail})
   if(!user){
    res.status(404).send("User not found")
   }else {
    res.send('Your User \n' +user)
   }
   
  } catch (error) {
    
    res.status(400).send("Something went wrong")
  }

})

app.get("/allUsers",async(req,res)=>{
  try {
    const allUsers = await User.find({})
    if(allUsers.length ===0){
      res.status(404).send("No users found")
    }
    else{
      res.send(allUsers)
    
    }
   
  } catch (error) {
    res.status(400).send("Something went wrong") 
  }
})

app.delete("/user",async(req,res)=>{
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId)
    if(!user){
      res.status(404).send("User not found")
    }else{
      res.send("User deleted successfully")
    }
    
  } catch (error) {
    res.status(400).send("Something went wrong")
    
  }
})

app.patch('/user',async(req,res)=>{
  const userId = req.body.userId;
  const updatedData = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData)
    if(!updatedUser){
      res.status(404).send("User not found")
    }
    else{
      res.send("User updated successfully")
    }
    
  } catch (error) {
    res.status(400).send("Something went wrong")
    
  }

})