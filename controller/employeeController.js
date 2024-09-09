import express from 'express';
import mongoose from "mongoose";
import db from '../connection/database.js';
import Employee from '../model/employee.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const secret='test';

const router = express.Router();

export const loginEmployee = async (req,res)=>{
    const {email, password}=req.body;
    try{
       
        const existingEmployee = await Employee.findOne({email});
        if(!existingEmployee)return res.status(404).json({ message: "User doesn't exist" });
        
        const isPasswordCorrect = await bcrypt.compare(password, existingEmployee.password); //|| existingEmployee.password == password
        // const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
        ///const token = jwt.sign({ email: existingEmployee.email, id: existingEmployee._id }, secret, { expiresIn: "5h" });
        res.status(200).json({ result: existingEmployee});

    }catch(err){
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const createNewEmployee = async(req,res)=>{
    const {firstName,lastName,email,password,role} = req.body;

    try{
       // var dbo = db.databaseName("sample-upload");
    //    const oldEmployee = await Employee.findOne({_id});
    //    if(oldEmployee) return res.status(400).json({message:'Staff already exist'});
        const hashedPassword = await bcrypt.hash(password,12);
        const result = await Employee.create({firstName,lastName,email,role,password: hashedPassword});
        res.status(201).json({result});
    }
    catch(err){ 
        res.status(500).json({message: "Something went wrong"}); 
        console.log(err);
    }
}

export const getAllEmployee = async(req,res)=>{
    try{
        let result = await Employee.find();
        res.send(result).status(200);
    }catch(err){
        res.status(400).json({message:err.message});
    }
}