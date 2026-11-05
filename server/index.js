import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import TransactionModel from "./model/schema.js";

const app = express();

dotenv.config();

const PORT = 5000 || process.env.PORT;


 app.use(cors({
  
 }));
 app.use(express.json());

  app.get("/" , (req ,res) =>{
     res.send("server is runnn...");
  })


// connectDB()
async function connectDB() {
  
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    
  }
}
connectDB();


app.post("/api/transaction" , async(req , res) => {


     console.log("Received transaction:", req.body);
     const { name , description , datetime, price} = req.body;

     const transaction = await TransactionModel.create({ name , description , datetime, price});
    
     res.json(transaction);
})


app.get("/api/transactions" ,async(req ,res) =>{
    const transactions =  await TransactionModel.find();
    res.json(transactions);
})

app.listen(PORT , () =>{
     console.log(`server running on ${PORT}`);
 })

