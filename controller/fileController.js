import express, { response } from 'express';
import mongoose from "mongoose";
import File from '../model/filedocument.js';
import multer from 'multer';
import mailSender from "../email/emailotp.js";
import joborders from "../model/joborders.js";
import filedocument from '../model/filedocument.js';

export const storageFile = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'public/file')
    },
    filename: function(req,file,cb){
        const uniqueSuffix = Date.now();
        cb(null,uniqueSuffix+file.originalname);
    }
});

const secret='test';

const router = express.Router();
const uploadFile = multer({storage:storageFile});

export const fileInprogressCompletedUpload = async(req,res)=>{
    const {documentFile,comment,jobordersId,joborderStatus,jobStatusUpdate} = req.body;
    try{
        const docuName = req.file.filename;
        const result = await File.create({documentFile:docuName,comment,jobordersId,joborderStatus,jobStatusUpdate})

        try{
            const ongoingTrans = joborders.findone({_id:jobordersId});
            if(!ongoingTrans) return res.json({status:"ID not found"});
            await joborders.updateOne({
                _id:jobordersId,
            },{
                $set:{
                    jobStatus: jobStatusUpdate
                }
            })
        }
        catch(err){
            console.log(err);
        }
        res.status(201).json({result});
    }
    catch(err){
        res.json({status: err});
    }
}

export const fileUpload = async (req,res)=>{
    const {documentFile,comment,jobordersId,joborderStatus,jobStatusUpdate,jobStartDate,jobEndDate} = req.body;
    console.log(jobStatusUpdate)
    try{
        const docuName = req.file.filename;
        console.log(documentFile)
        const result = await File.create({documentFile:docuName,comment,jobordersId,joborderStatus,jobStartDate,jobEndDate});
       
        try{
            const ongoingTransaction = joborders.findOne({_id:jobordersId});
            if(!ongoingTransaction) return res.json({status:"ID not found"});
                //const jobStatusUpdate ='Completed'
                if(jobStatusUpdate === 'Complete'){
                    await joborders.updateOne({
                        _id:jobordersId,
                    },{
                        $set:{
                            jobStatus: jobStatusUpdate,
                           
                        } 
                    });
                }else{
                await joborders.updateOne({
                    _id:jobordersId,
                },{
                    $set:{
                        jobStatus: jobStatusUpdate,
                        dateStarted: jobStartDate,
                        dateEnded: jobEndDate,
                    } 
                });
            }
            //  }catch(err){
            //   //  res.json({status:err});
            //  }
           
        }catch(err){
           // res.json({status:err});
        }
     res.status(201).json({result});

    }catch(err){
        res.json({status:err});
    }
}

export const getFileUploaded = async(req,res)=>{
    try{
        let result = await filedocument.find();
        res.send(result).status(200);

    }catch(err){
        res.status(400).json({message:err.message});
        console.log(err);
    }
   
}

export const sendFileAttachment = async (req,res)=>{
    const {email,uploadedId,fileattach,comment}= req.body;
    const {documentFile,id} = req.params;
    console.log(email);
    console.log(fileattach)
    
    try{
       // const link = `http://localhost:5000/file${fileattach}`
        const existingFile = await filedocument.findOne({_id:uploadedId})
        if(!existingFile) return res.status(400).json({message:"File does not exist"});
        console.log(documentFile)
         const mailResponse =await mailSender(
            email,
            "Mr. Quick Fix",
            `<!DOCTYPE html>
            <html lang="en" >
            <head>
                <meta charset="UTF-8">
                <title>Mr. Quick Fix Update Status</title>
                
            
            </head>
            <body>
            <!-- partial:index.partial.html -->
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Mr Quick </a>
                </div>
                <p style="font-size:1.1em">Hi,</p>
                <p>Good Day! This email is to inform you that our staff will contact you for the next visitation and update for the project. </p>
                <p>Please be advice that we will contact you using the phone number that you provided.</p>
                 <p> Please see the attached file provided for this project. This is also serves as your copy. </p>
                
                <p style="font-size:0.9em;">Regards,<br />Mr. Quick Fix</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                    <p>Mr Quick Fix PH</p>
                    <p>Philippines</p>
                </div>
                </div>
            </div>
            <!-- partial -->
                
            </body>
            </html>`,
            {
                filename: fileattach,
                path:`http://localhost:5000/file/${fileattach}`
                // link`http://localhost:5000/file/${documentFile}`
             }
        )
    }catch(err){
        return res.json({message:err});
    }



}
export const completeStatus = async(req,res) =>{
    const {email,jobordersId,fileattach} = req.body;
    try{
        const transaction = await joborders.findOne({_id:jobordersId});
        console.log(jobordersId);
        if(!transaction) return res.json({status:"Transaction Not Exists!"});

        const link = `http://localhost:5000/fileuploaded/completetransaction/survey/${transaction._id}`;
        const mailResponse = await mailSender(
            email,
            "Mr. Quick Fix",
            `<!DOCTYPE html>
            <html lang="en" >
            <head>
                <meta charset="UTF-8">
                <title>Mr. Quick Fix Status: Completed</title>
                
            
            </head>
            <body>
            <!-- partial:index.partial.html -->
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Mr Quick </a>
                </div>
                <p style="font-size:1.1em">Hi,</p>
                <p>Good Day! This email is to inform you that your transaction with us is now completed. We already attached the last document for this project</p>
                <p>Hoping for another transaction with you! </p>
               
                <p>Hoping for you to take some time to answer the survey. This will help us improve. Your input is much appreciated. </p>
                <a href=${link}>Survery</a>
                <p style="font-size:0.9em;">Regards,<br />Mr. Quick Fix</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                    <p>Mr Quick Fix PH</p>
                    <p>Philippines</p>
                </div>
                </div>
            </div>
            <!-- partial -->
                
            </body>
            </html>`,
            {
                filename: fileattach,
                path:`http://localhost:5000/file/${fileattach}`
                // link`http://localhost:5000/file/${documentFile}`
             }
            
        )
        console.log(link);
        return res.json({status:okay})
    }catch(err){
        return res.json({message:err});
    }

}

export const getSurvey = async(req,res)=>{
    const {id} = req.params;
    const transaction = await joborders.findOne({_id:id});
    if(!transaction) return res.json({status: "Transaction not found"});
    try{
        res.json({message:"Transaction Found!"})
    }
    catch(err){
        res.send("Not Verify");
    }
}
export const saveSurvey = async(req,res)=>{
    const {id}= req.params;
    const {clientSurvey} = req.body;
    const transaction = await joborders.findOne({_id:id});
    if(!transaction) return res.json({status:"Transaction not found!"});

}

export const cancelStatus = async(req,res) =>{
    const {email,jobordersId,jobStatusUpdate} = req.body;
    try{
        const transaction = await joborders.findOne({_id:jobordersId});
        console.log(jobordersId);
        if(!transaction) return res.json({status:"Transaction Not Exists!"});

       
            // const transaction = joborders.findOne({_id:jobordersId});
            await  joborders.updateOne({
                _id:jobordersId,
            },{
                $set:{
                    jobStatus: jobStatusUpdate
                }
            })
        // }
        // catch(err){
        //     console.log(err)
        // }
        const mailResponse = await mailSender(
            email,
            "Mr. Quick Fix",
            `<!DOCTYPE html>
            <html lang="en" >
            <head>
                <meta charset="UTF-8">
                <title>Mr. Quick Fix Status: Cancelled</title>
                
            
            </head>
            <body>
            <!-- partial:index.partial.html -->
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Mr Quick </a>
                </div>
                <p style="font-size:1.1em">Hi,</p>
                <p>Good Day! We were sorry to inform you that your transaction with us will be cancelled and will not continue.</p>
               
                
                <p style="font-size:0.9em;">Regards,<br />Mr. Quick Fix</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                    <p>Mr Quick Fix PH</p>
                    <p>Philippines</p>
                </div>
                </div>
            </div>
            <!-- partial -->
                
            </body>
            </html>`,
            
        )
        return res.json({status:okay})
    }catch(err){
        return res.json({message:err});
    }

}


 