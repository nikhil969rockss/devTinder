const express = require('express')
const userAuthLogin = require('../middlewares/userAuthLogin')
const connectionRouter = express.Router()
const Connection = require('../Schemas/connectionSchema')
const User = require('../Schemas/userSchema')


connectionRouter.post('/send/:status/:userID', userAuthLogin, async(req,res)=>{
  try {
    const receiverID = req.params.userID
    const status = req.params.status
    const senderID = req.user._id;

    const allowedStatusTypes =['pass','like']
    if(!allowedStatusTypes.includes(status)){
      throw new Error("Invalid status "+ status)
    }


    if(senderID === receiverID){
      throw new Error("Cannot send request to yourself")
    }
    const existingConnection = await Connection.findOne({
     $or:[{senderID,receiverID},{senderID:receiverID, receiverID:senderID}],
    })
    
    
    if(existingConnection){
      throw new Error("Request already sent")
    }
    const connection = await new Connection({
    senderID,
      receiverID,
      status
    })
    const receiverData = await User.findById(receiverID)
    
    await connection.save()
     if(status === 'like'){
    res.json({message: `${req.user.firstName} has sent the request to ${receiverData.firstName}`,
      data: connection
    })}
    if(status ==='pass'){
      res.json({message: `${req.user.firstName} has rejected the ${receiverData.firstName}`,
        data: connection
      })}
    
    
  } catch (error) {
    return res.status(400).send({ error : error.message})
  }
})
module.exports = connectionRouter
