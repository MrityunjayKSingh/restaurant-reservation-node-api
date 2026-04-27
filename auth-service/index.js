const express=require('express');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const mongoose=require('mongoose');

const app=express();
app.use(express.json());

const SECRET="secret";
const REFRESH_SECRET="refresh_secret";

mongoose.connect('mongodb://mongo:27017/auth');

const User=mongoose.model('User',{
 username:String,
 password:String,
 role:String
});

const RefreshToken=mongoose.model('RefreshToken',{
 token:String,
 userId:String
});

(async ()=>{
 const exists=await User.findOne({username:"admin"});
 if(!exists){
   const hash=await bcrypt.hash("admin123",10);
   await User.create({username:"admin",password:hash,role:"ADMIN"});
 }
})();

app.post('/login', async (req,res)=>{
 const {username,password}=req.body;
 const user=await User.findOne({username});
 if(!user) return res.status(401).send("Invalid");

 const match=await bcrypt.compare(password,user.password);
 if(!match) return res.status(401).send("Invalid");

 const accessToken=jwt.sign({id:user._id,role:user.role},SECRET,{expiresIn:"15m"});
 const refreshToken=jwt.sign({id:user._id},REFRESH_SECRET,{expiresIn:"7d"});

 await RefreshToken.create({token:refreshToken,userId:user._id});

 res.json({accessToken,refreshToken});
});

app.post('/refresh', async (req,res)=>{
 const {token}=req.body;
 if(!token) return res.status(401).send("No token");

 const exists=await RefreshToken.findOne({token});
 if(!exists) return res.status(403).send("Invalid");

 try{
   const data=jwt.verify(token,REFRESH_SECRET);
   const accessToken=jwt.sign({id:data.id},SECRET,{expiresIn:"15m"});
   res.json({accessToken});
 }catch(e){
   res.status(403).send("Invalid");
 }
});

app.listen(3003,()=>console.log("Auth running"));
