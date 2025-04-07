const mongoose = require('mongoose');
const {Schema} = mongoose
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  firstName:{
    type: String,
    required: [true, "First Name is required"],
    minLength:3,
    maxLength:50,
    trim: true,
    validate(value){
      if(value.length >50 || value.length <3){
        throw new Error("First Name should be between 3-50 characters")
      }

    }
  },
  lastName:{
    type: String,
    minLength:3,
    maxLength:50,
    trim: true,
    validate(value){if(value.length >50 || value.length <3){
      throw new Error("Last Name should be between 3-50 characters")
    }
  }
},
email:{
  type: String,
  required: [true , "Email is required"],
  unique: true,
  trim: true,
  lowercase:true
},
password:{
  type:String,
  required: [true, "Password is required"],
  minLength:8,
},
age:{
  type: Number,
  min:18,
},
gender:{
  type: String,
  enum: {
    values: ['male', 'female', 'others'],
    message: '{VALUE} is not a valid gender'
  }
},
photoURL:{
  type:String,
  default: "https://www.google.com",
  trim: true,
  maxLength:100,
},
description:{
  type: String,
  maxLength: 300,
  default: "Hello I'm a new User, Let's connect 👋",
  trim: true,
},
skills:{
  type: [String],
  validate(value){
    if(value.length>10){
      throw new Error("Skills should not exceed more than 10")
    }
  }
}
  
},{timestamps: true })

userSchema.methods.generateJWT=async function (){
  const user =this;
  const token = await jwt.sign({userID:user._id},"PrivateKEY@99")
  return token
}

userSchema.methods.comparePassword = async function(passwordInputByUser){
  const user = this;
  const isMatch = await bcrypt.compare(passwordInputByUser,user.password)
  return isMatch;
}
const User = mongoose.model("User",userSchema)

module.exports= User;