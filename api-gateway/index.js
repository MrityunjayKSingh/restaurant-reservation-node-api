const express=require('express');
const axios=require('axios');
const jwt=require('jsonwebtoken');

const app=express();
app.use(express.json());

const SECRET="secret";

const auth=(req,res,next)=>{
 const header=req.headers.authorization;
 if(!header) return res.status(401).send("No token");

 const token=header.split(" ")[1];

 try{
   const decoded=jwt.verify(token,SECRET);
   req.user=decoded;
   next();
 }catch(e){
   res.status(403).send("Invalid token");
 }
};

app.use('/auth', async(req,res)=>{
 const r=await axios({method:req.method,url:'http://auth-service:3003'+req.url,data:req.body});
 res.json(r.data);
});

app.use('/tables',auth, async(req,res)=>{
 const r=await axios({method:req.method,url:'http://table-service:3001'+req.url,data:req.body});
 res.json(r.data);
});

app.use('/reservations',auth, async(req,res)=>{
 const r=await axios({method:req.method,url:'http://reservation-service:3002'+req.url,data:req.body});
 res.json(r.data);
});

app.listen(3000,()=>console.log("Gateway"));
