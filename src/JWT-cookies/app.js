const express = require('express')
const app = express()
const port = 3000;
const dbConnection = require('./dbConnection')
const cookieParser = require('cookie-parser')
const handleSignup = require('./requestHandlers/handleSignup')
const handleLogin = require('./requestHandlers/handleLogin')
const handleProfile = require('./requestHandlers/handleProfile')


const URI = "mongodb+srv://nikhil969work:Y8haIdnS6DfY93vy@learnmongo.1ubda.mongodb.net/devTInder"

dbConnection(URI).then(()=>{
  console.log('Connection to Database Established');
  app.listen(port,()=>console.log(`Your server is listening on ${port}`));

}).catch(err=>{
  console.log(`Error connecting to Database ${err.message}`);
})

app.use(express.json())
app.use(cookieParser())

app.post('/signup', handleSignup)
app.post('/login', handleLogin)
app.get('/profile', handleProfile)