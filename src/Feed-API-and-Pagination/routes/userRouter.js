const express = require('express');
const userRouter = express.Router()
const Connection = require('../Schemas/connectionSchema');
const userAuthLogin = require('../middlewares/userAuthLogin');
const User = require('../Schemas/userSchema')

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
    }).populate("senderID",USER_SAFE_DATA).populate("receiverID",USER_SAFE_DATA)

   
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

userRouter.get("/feed", userAuthLogin , async(req,res)=>{
  try {
    const loggedInUser = req.user;
    
    const page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10
    limit = limit>50 ? 50: limit
    const skip = (page-1)*limit

    /* TODOs: ->
    
    What can a loggedIN user see on his/her feed api

    1. logged In user should only see the profile which is not either pass or like

    2. logged In user should not see his/her profile 

    3. loggedIn user should not see the connected user profile 
    
    
    */
   const userInteraction = await Connection.find({
    $or: [{senderID: loggedInUser._id},{receiverID: loggedInUser._id}]
   }).select(['senderID','receiverID'])
   
   const hideUserFromFeed = new Set()
   userInteraction.forEach(interaction=>{
    hideUserFromFeed.add(interaction.senderID.toString())
    hideUserFromFeed.add(interaction.receiverID.toString())
   })
   const feedUser = await User.find({
    $and:[{_id: {$nin: Array.from(hideUserFromFeed)}},
      {_id: {$ne: loggedInUser._id}}
    ]
}).select(USER_SAFE_DATA).skip(skip).limit(limit)

  if(feedUser.length === 0){
    return res.json({message: "You've seen all the users"})
  }

   res.json(feedUser)
   
  } catch (error) {
    return res.status(400).send({ error : error.message})
  }
})


module.exports = userRouter