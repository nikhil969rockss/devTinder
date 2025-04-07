const express = require('express');
const userRouter = express.Router()
const Connection = require('../Schemas/connectionSchema');
const userAuthLogin = require('../middlewares/userAuthLogin');

const USER_SAFE_DATA =['firstName','lastName','age','gender','skills','description','photoURL']
userRouter.get("/view/allRequest" ,userAuthLogin ,async(req,res)=>{
  try {
    const loggedInUser = req.user
    //loggedInUser should see the request that are only status interested
    // suppose Nikhil ---->send request ---> Akshay
    // 
    const allRequest = await Connection.find({
      status: "like",
      receiverID: loggedInUser.id
    }).populate("senderID", USER_SAFE_DATA)
    
    const allRequestData = allRequest.map(row =>row.senderID)
    if(allRequest.length===0){
      return res.json({message: "No request found"})
    }

    console.log(allRequest);
    res.json({message: `${loggedInUser.firstName}, You have ${allRequest.length} Request pending`,
      data: allRequestData
    })


  } catch (error) {
    return res.status(400).send({ error : error.message})
  }

})
userRouter.get('/view/allConnections', userAuthLogin, async(req,res)=>{
  try {
    const loggedInUser = req.user
    // logged in user should see the connections that are status : accepted only
    // for example if Nikhil accepted the request of mark then both login user Nikhil as well mark should see the connections in both their respective profiles. that means senderID or receiverID can be interchanged

    const allConnections = await Connection.find({
      $or:[{receiverID:loggedInUser,status:"accepted"},{senderID:loggedInUser,status:"accepted"}]
    }).populate("senderID",USER_SAFE_DATA)

    console.log(allConnections.length);
    if(allConnections.length === 0){
      return res.json({message: "There are no connection yet"})
    }
    const allConnectionData = allConnections.map(user =>{
  if(user.senderID._id.toString() === loggedInUser._id.toString()){
    return user.receiverID
  }else return user.senderID
    })
    res.json({message: `${loggedInUser.firstName}, You have ${allConnections.length} connections`,
      data: allConnectionData
    })
    
   
    
  } catch (error) {
    return res.status(400).send({ error : error.message})
  }
})

module.exports = userRouter