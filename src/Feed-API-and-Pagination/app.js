const express = require('express')
const app = express()
const port = 3000;
const cookieParser = require('cookie-parser')
const connectionToDatabase = require('./dbConnection')
const authRouter = require('./routes/authRouter')
const profileRouter = require('./routes/profileRouter');
const connectionRouter = require('./routes/connectionRequestRouter');
const userRouter = require('./routes/userRouter');

const URI = "mongodb+srv://nikhil969work:Y8haIdnS6DfY93vy@learnmongo.1ubda.mongodb.net/devTInder"

connectionToDatabase(URI).then(()=>{
  console.log(`connection to database established`);
  app.listen(port, ()=>console.log(`your server is listening to port------> ${port}`))
}).catch(err=>console.error(`failed to connect to the database`))

app.use(express.json())
app.use(cookieParser())

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", connectionRouter)
app.use("/", userRouter)