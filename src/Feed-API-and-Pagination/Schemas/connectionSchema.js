const mongoose = require('mongoose');
const {Schema} = mongoose

const connectionSchema = new Schema({
  senderID:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiverID:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type : String,
    enum: {
      values: ['like','pass','accepted','rejected'],
      message :`{VALUE} is not a valid`
    }
  }
},{timestamps:true,})

const Connection = mongoose.model ('Connection', connectionSchema)

module.exports = Connection;