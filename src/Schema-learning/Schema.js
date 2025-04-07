const express = require('express')
const app =  express();
const connectToDB = require('./DbConnection')
const User = require('./models/UserSchema')

const URI = "mongodb+srv://nikhil969work:Y8haIdnS6DfY93vy@learnmongo.1ubda.mongodb.net/devTInder"
const PORT = 3003;

connectToDB(URI).then(()=>{
  app.listen(PORT,()=>console.log(`Your server is running on PORT-> ${PORT}`))
  console.log(`Connected to Database Successfully!!!!!!!!`);

}).catch(err=>{
  console.log(`couldn't connect to database kindly try again later ${err.message}`);

})

app.post('/signup', async(req,res,next)=>{
  const dummyData = {
    firstName:"Nikhil",
    lastName: "Singh",
    emailID:"nikhil@gmail.com",
    gender:"male"
  }
  const user = new User(dummyData)

  try {
    await user.save()
  res.send("New user added successfully")
    
  } catch (error) {
    res.status(400).send("unable to save "+error.message)
    
  }
  
})

