const mongoose = require('mongoose')
const dbConnection = async(URI)=>{
 await mongoose.connect(URI)  

}
module.exports = dbConnection