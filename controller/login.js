import express from 'express';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import Login from '../model/login.js';
import db from '../connection/database.js';
const secret = 'test';
const router = express.Router();

export const loginData = async (req,res) =>{
    // try{
    //     let collection = await db.collection("quickdata");
    //     let result = await collection.find({}).toArray();
    //     res.send(result).status(200);
    // }
    // catch(error){
    //     res.status(404).json({ message: error.message });    
    // }
    const {email, password} = req.body;
    try{
       
        const existingEmployee = await Login.findOne({email});
        if(!existingEmployee)return res.status(404).json({ message: "User doesn't exist" });
        const isPasswordCorrect = await bcrypt.compare(password, existingEmployee.password)|| existingEmployee.password == password;

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
        res.status(200).json({ result: existingEmployee });

    }catch(err){
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const getEmployeee = async (req,res) =>{
    try{
       // let collection = await db.collection("MrQuick-employee");
        let result = await Login.find({}).toArray();
        res.send(result).status(200);
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
}
export default router;