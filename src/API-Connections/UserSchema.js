const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
  firstName:{
    type: String
  },
  lastName: {
    type: String
  },
  emailId: {
    type: String
  },
  password:{
    type: String
  },
  gender:{
    type: String
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User;