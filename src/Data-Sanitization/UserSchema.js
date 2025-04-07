const mongoose = require('mongoose')
const {Schema} =  mongoose;

const userSchema = new Schema({
  firstName:{
    type:String,
    required: [true,"First Name is required"],
    minLength:3,
    maxLength:50
  },
  lastName:{
    type:String,
    minLength:3,
    maxLength:50

  },
  email:{
    type:String,
    required: [true,"Email is required"],
    unique: true,
    
  },
  password:{
    type: String,
    required: [true,"Password is required"],
    minLength:8,
    maxLength:50

  },
  age:{
    type:Number,
    min:18
  },
  gender:{
    type: String,
    validate(value){
      if(!["male","female","others"].includes(value.toLowerCase())){
        throw new Error("Gender is not a valid")
      }
    }
  },
  description:{
    type: String,
    maxLength:250,
    default: "Hello I'm a new User LETS CONNECT👋"
  },
  photoURL:{
    type: String,
    default:"https://www.google.com"

  },
  skills:{
    type: [String]
  }
},{timestamps:true})

const User = mongoose.model("User", userSchema)


module.exports= User;