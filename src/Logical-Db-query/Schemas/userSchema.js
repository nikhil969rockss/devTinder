const mongoose = require('mongoose')
const {Schema} = mongoose
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new Schema({
  firstName:{
    type: String,
    required : [true ,"first name is required"],
    minLength: 3,
    maxLength: 50,
    trim: true,
    index:true
  },
  lastName:{
    type: String,
    maxLength: 50,
    trim: true
  },
  email:{
    type: String,
    unique: true,
    required: [true, "email is required"],
    lowercase: true,
    trim:true,
    maxLength:100
    
  },
  password:{
    type:String,
    required: [true, "password is required"],
    minLength: 8,
  
  },
  gender:{
    type: String,
    enum:{
      values: ['male', 'female', 'other'],
      message: "{VALUE} is not a valid gender"
    }
  },
  age:{
    type: Number,
    min: 18,
    max: 120
  },
  photoURL:{
    type:String,
    default: "https://www.gravatar.com/avatar/?d=identicon&s=200",
    trim: true,
    maxLength:100,
    validate(value){
      if(!validator.isURL(value)){
        throw new Error("Invalid URL")
      }
    }
  },
  description:{
    type: String,
    maxLength:300,
    default: "Hello I'm a new User, Let's connect 👋👋",
    trim:true,
    validate(value){
      if(value.length>300){
        throw new Error("Description should not exceed more than 300 characters")
      }
    }
  },
  skills:{
    type: [String],
    validate(value){
      if(value.length>10){
        throw new Error("Skills should not exceed more than 10")
      }
    }
  }
},{timestamps:true})

userSchema.methods.generateJWT= async function (){
  const user = this;
  const token = await jwt.sign({userID: user._id},"PrivateKEY@99")
  return token
}

userSchema.methods.generatePasswordHash =  async function(){
  const user = this;
  const hashedPassword = await bcrypt.hash(user.password,10)
  return hashedPassword;
}

userSchema.methods.comparePassword = async function (passwordInputByUser){
  const user = this;
  const isMatch = await bcrypt.compare(passwordInputByUser,user.password)
  return isMatch;
}

const User = mongoose.model("User",userSchema)

module.exports= User;