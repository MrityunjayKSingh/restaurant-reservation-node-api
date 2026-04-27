const express=require('express');
const mongoose=require('mongoose');
const app=express();app.use(express.json());

mongoose.connect('mongodb://mongo:27017/tables');

const Table=mongoose.model('Table',{
 tableNumber:Number,capacity:Number,location:String
});

app.post('/',async(req,res)=>{
 if(!req.body.capacity) return res.status(400).send("capacity required");
 const t=await Table.create(req.body);
 res.json(t);
});

app.get('/',async(req,res)=>{
 res.json(await Table.find());
});

app.listen(3001,()=>console.log('Table 3001'));
