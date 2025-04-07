const mongoose = require('mongoose');
const connectionToDatabase = async (URI)=>{
  await mongoose.connect(URI)
}

module.exports = connectionToDatabase;