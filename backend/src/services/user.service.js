const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwtProvider = require("../config/jwtProvider")

const findByFirebaseUid = async (uid) => {
  return await User.findOne({ firebaseUid: uid });
};

const createUserFromFirebase = async (firebaseUser) => {
  const user = await User.create({
    firebaseUid: firebaseUser.uid,
    email: firebaseUser.email,
    firstName: firebaseUser.name || "",
    role: "CUSTOMER",
  });
  return user;
};
const createUser = async(userData)=>{
    try{
        let{firstName,lastName,email,password}=userData;
        const isUserExist= await User.findOne({email})

        if(isUserExist){
            throw new Error("user alread exist with email:" ,email)
        }
        password=await bcrypt.hash(password,6);

        const user = await User.create({firstName,lastName,email,password})
        console.log("user created successfully",user)
        return user;
    }catch(error){ 
        throw new Error(error.message)
    }
}
const findUserById=async(userId)=>{
    try {
        const user = await User.findById(userId).populate("address");
        if(!user){
            throw new Error("user not found with id:",userId)

        }return user;

    } catch (error) {
         throw new Error(error.message)
        
    }
}

const getUserByEmail=async(email)=>{
    try {
        const user = await User.findOne({email});
        if(!user){
            throw new Error("user not found with email:",email)

        }return user;

    } catch (error) {
         throw new Error(error.message)
        
    }
}

const getUserProfileByToken = async(token)=>{
    try{
        const userId = jwtProvider.getUserIdFromToken(token);
        const user = await findUserById(userId);
          if(!user){
            throw new Error("user not found with email:",userId)
        }return user;

    }catch(error){
        throw new Error(error.message)


    }
}

const getAllUsers = async()=>{
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports={createUser,findUserById,getUserByEmail,getUserProfileByToken,getAllUsers,findByFirebaseUid,createUserFromFirebase}