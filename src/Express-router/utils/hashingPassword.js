const bcrypt = require('bcrypt');

const getHashedPassword = async(passwordByUser)=>{
const hashedPassword = await bcrypt.hash(passwordByUser,10)
return hashedPassword;}

module.exports= getHashedPassword;