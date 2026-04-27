const express=require('express');
const mongoose=require('mongoose');
const axios=require('axios');
const Redis=require('ioredis');
const redis=new Redis("redis://redis:6379");

const app=express();app.use(express.json());
mongoose.connect('mongodb://mongo:27017/reservations');

const Reservation=mongoose.model('Reservation',{
 tableId:String,date:String,timeSlot:String,guestCount:Number
});

async function assignTable(guestCount,date,timeSlot){
 const {data:tables}=await axios.get('http://table-service:3001');
 tables.sort((a,b)=>a.capacity-b.capacity);

 for(let t of tables){
  if(t.capacity>=guestCount){
   const exists=await Reservation.findOne({tableId:t._id,date,timeSlot});
   if(!exists) return t;
  }
 }
 throw new Error("No table available");
}

app.post('/',async(req,res)=>{
 const lockKey=`lock:${req.body.date}:${req.body.timeSlot}`;
 const lock=await redis.set(lockKey,"1","NX","EX",5);

 if(!lock) return res.status(429).send("Try again");

 try{
  const {guestCount,date,timeSlot}=req.body;
  const table=await assignTable(guestCount,date,timeSlot);

  const r=await Reservation.create({
   tableId:table._id,date,timeSlot,guestCount
  });

  // Kafka placeholder
  console.log("Event: reservation_created", r._id);

  res.json(r);
 }catch(e){
  res.status(400).json({error:e.message});
 }finally{
  await redis.del(lockKey);
 }
});

app.listen(3002,()=>console.log('Reservation 3002'));
