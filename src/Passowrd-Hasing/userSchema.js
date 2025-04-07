const mongoose = require('mongoose')
const {Schema} =mongoose;

const userSchema = new Schema ( {
  firstName:{
    type: String,
    required: [true,"First Name is required between 3-50 characters"],
    minLength: 3,
    maxLength: 50,
    trim: true
  },
  lastName:{
    type: String,
    minLength: 3,
    maxLength: 50,
    trim: true
  },
  email:{
    type: String,
    required: [true,"Email is required"],
    unique: true,
    lowercase:true,
    trim:true,

    },
    password:{
      type: String,
      required: [true,"Password is required"],
      minLength: 8,
     
    },
    age:{
    type: Number,
    min: 18
  },
  photoURL:{
    type: String,
    default:"https://www.google.com",
    trim:true,
  },
  description:{
    type: String,
    maxLength: 300,
    default: "Hello I'm a new User, Let's connect��",
    trim:true,
  },
  skills:{
    type: [String],
    validate(value){
      if(value.length>10){
        throw new Error("Skills should not exceed more than 10")
      }
    }

  }

  
},{timestamps: true})

const User = mongoose.model("User", userSchema)

module.exports= User;