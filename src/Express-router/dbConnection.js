const mongoose = require('mongoose')
const connectToDB = async(URI)=>{
await mongoose.connect(URI)
}

module.exports = connectToDB