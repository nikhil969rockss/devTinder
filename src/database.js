const express = require("express")
const connectToDB = require("./config/connectToDatabase")
const app = express()
const PORT = 3002;
const URI = "mongodb+srv://nikhil969work:Y8haIdnS6DfY93vy@learnmongo.1ubda.mongodb.net/devTInder"

connectToDB(URI).then(()=>{
  console.log("connection to database successfully");
  app.listen(PORT,()=>console.log(`server is listening on port ${PORT}`))

}).catch(err=>{
 
  console.log(err.message)

})
