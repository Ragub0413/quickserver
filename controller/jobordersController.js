import express from 'express';
import mongoose from 'mongoose';
import joborders from '../model/joborders.js';

const secret ='MrQuick';
const router = express.Router();
export const createNewJobOrder =async(req,res)=>{
    const {clientFirstName,clientLastName,email,clientsAddress,typeOfJob,jobCategory,jobStatus,
        contactNumber,jobAdmin,dateStarted,dateEnded
    } = req.body;
    
    try{
        const result = await joborders.create({clientFirstName,clientLastName,email,clientsAddress,typeOfJob,jobCategory,jobStatus,
            contactNumber,jobAdmin,dateStarted,dateEnded
        });
        res.status(201).json({result});

    }catch(err){
        res.status(500).json({message:'Something went wrong'});
        console.log(err);
    }
}
export const getAllJobOders = async (req,res)=>{
    try{
        let result = await joborders.find();
        res.send(result).status(200);
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
}

export const getJobSearch = async (req,res)=>{
    const {id} = req.params;
  
    try{
      const cInfo = await joborders.findById(id);
      res.status(200).json(cInfo);
    }
    catch(error){
      res.status(404).json({message: error.message});
    }
  }
export default router;