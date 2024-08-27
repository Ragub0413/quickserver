import express from 'express';
import mongoose from 'mongoose';
import Test from '../model/test.js';
import db from '../connection/database.js';

const router = express.Router();

export const getTestData = async (req,res) =>{
    try{
        let collection = await db.collection("quickdata");
        let result = await collection.find({}).toArray();
        res.send(result).status(200);
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
}
export default router;