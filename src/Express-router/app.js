require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const dbConnection = require('./dbConnection')
const cookieParser = require('cookie-parser')
const authProfileRouter = require('./routes/authProfile');
const profileRouter = require('./routes/profile');

const URI = process.env.DATA_BASE_URI;

dbConnection(URI).then(()=>{
  console.log('Connection to Database Established');
  app.listen(port,()=>console.log(`Your server is listening on ${port}`));

}).catch(err=>{
  console.log(`Error connecting to Database ${err.message}`);
})

app.use(express.json())
app.use(cookieParser())

app.use('/', authProfileRouter)
app.use('/', profileRouter)
