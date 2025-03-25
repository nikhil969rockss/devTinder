const express =  require("express")

const app =  express()

const PORT = 3000;
app.use('/test', (req,res)=>{
  res.end("This is another Route handler")
  })
  

app.use('/', (req,res)=>{
res.end("Hello From the server this is the first code")
})

app.listen(PORT,()=>{
  console.log(`Server is running on PORT ${PORT}`);
})