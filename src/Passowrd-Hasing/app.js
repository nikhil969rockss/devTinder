const express = require('express')
const app = express()
const port = 3000
const dbConnection = require('./dbConnection')
const handleSignup = require('./requestHandler/handleSignupRequest')
const handleLogin = require('./requestHandler/handleLoginRequest')


const URI = "mongodb+srv://nikhil969work:Y8haIdnS6DfY93vy@learnmongo.1ubda.mongodb.net/devTInder"

dbConnection(URI).then(()=>{
  console.log(`Connection to database established`)
  app.listen(port,()=>console.log(`Your server is listening on ${port}`))

})
app.use(express.json())

app.post("/Signup",handleSignup)

app.post("/Login",handleLogin)