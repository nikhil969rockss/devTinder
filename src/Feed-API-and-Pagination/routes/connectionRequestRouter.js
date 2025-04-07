const express = require('express')
const userAuthLogin = require('../middlewares/userAuthLogin')
const connectionRouter = express.Router()
const Connection = require('../Schemas/connectionSchema')
const User = require('../Schemas/userSchema')

const USER_SAFE_DATA =['firstName','lastName','age','gender','skills','description','photoURL']
connectionRouter.post('/send/:status/:toReceiverID', userAuthLogin, async(req,res)=>{
  try {
    const receiverID = req.params.toReceiverID
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
      res.json({message: `${req.user.firstName} has ignored the ${receiverData.firstName}`,
        data: connection
      })}
    
    
  } catch (error) {
    return res.status(400).send({ error : error.message})
  }
})

connectionRouter.post('/review/request/:status/:requestID',userAuthLogin, async(req,res)=>{
  try {
    
      const loggedInUser = req.user
   
    const loggedInUserID = req.user._id
    const {status, requestID} = req.params
    // we have to check only status should allow either accept or reject
    

    
    const allowedStatusTypes = ['accepted', 'rejected']
    if(!allowedStatusTypes.includes(status)){
      throw new Error("Invalid status "+ status)
    }
    if(requestID === loggedInUserID){
      throw new Error("Cannot review request to yourself")
    }
    
    //we have to check if the fromSenderID is present in the DB or not

    const checkingUserInDB = await Connection.findOne({_id:requestID})
    if(!checkingUserInDB){
      throw new Error("No connection found with this User")
    }
    // Finding request which is only status:like and received by the logged in user that is receiverID 

    const connectionRequest = await Connection.findOne({
      status: "like",
      _id: requestID,
      receiverID : loggedInUserID

    }).populate("senderID",USER_SAFE_DATA)
  
  // checking if the request is accepted or ignored by the previous search in the DB ie., checkingUserInDB
   if(!connectionRequest){
    
    if(checkingUserInDB.status ==='accepted'){
      throw new Error (" Request already accepted")
    }
    if(checkingUserInDB.status ==='rejected'){
      throw new Error ("Request already rejected")
    }

   }

   // changing the current status in the DB

    connectionRequest.status = status
   // saving the status
    await connectionRequest.save()
   
    res.json({message : `Request ${status}`,
    data:connectionRequest})
   
  } catch (error) {
    return res.status(400).send({ error : error.message})
  }
})





module.exports = connectionRouter
