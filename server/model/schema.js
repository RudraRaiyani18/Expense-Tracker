 import mongoose from "mongoose";

 const TransactionSchema = new mongoose.Schema({
     price : { type : Number},
    //  name : { type : String , trim: true},
     description : { type : String ,trim: true},
     datetime : { type : Date , default: Date.now,
  },

 })

 const Transaction = mongoose.model("Transaction", TransactionSchema);

 export default Transaction;
