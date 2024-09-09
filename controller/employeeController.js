import express from 'express';
import mongoose from "mongoose";
import db from '../connection/database.js';
import Employee from '../model/employee.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const secret='test';

const router = express.Router();

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