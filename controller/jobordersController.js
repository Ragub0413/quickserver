import express from 'express';
import mongoose from 'mongoose';
import joborders from '../model/joborders.js';
import mailSender from '../email/emailotp.js';

const secret ='MrQuick';
const router = express.Router();
export const createNewJobOrder =async(req,res)=>{
    const {clientFirstName,clientLastName,email,clientsAddress,typeOfJob,jobCategory,jobStatus,
        contactNumber,jobAdmin,dateStarted,dateEnded, inspectionSchedule
    } = req.body;
    
    try{
        const result = await joborders.create({clientFirstName,clientLastName,email,clientsAddress,typeOfJob,jobCategory,jobStatus,
            contactNumber,jobAdmin,dateStarted,dateEnded,inspectionSchedule
        });

        // if(inspectionSchedule!==null||inspectionSchedule!==""){
        //     const sched = new Date(inspectionSchedule).toLocaleDateString();
        //     console.log(sched);
        //     const mailResponse = await mailSender(
        //         email,
        //         "Verification Email",
        //         `<!DOCTYPE html>
        //         <html lang="en" >
        //         <head>
        //             <meta charset="UTF-8">
        //             <title>Mr Quick Schedule for Inspection</title>
                    
                
        //         </head>
        //         <body>
        //         <!-- partial:index.partial.html -->
        //         <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        //             <div style="margin:50px auto;width:70%;padding:20px 0">
        //             <div style="border-bottom:1px solid #eee">
        //                 <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Mr Quick Inspection Schedule</a>
        //             </div>
        //             <p style="font-size:1.1em">Hi,</p>
        //             <p>This email is to inform you that you have schedule for occular inspection with us at ${sched}</p>
        //             <p>Please be advice that we will contact you using the phone number that you provided.</p>
        //              <p> </p>
                    
        //             <p style="font-size:0.9em;">Regards,<br />Mr. Quick</p>
        //             <hr style="border:none;border-top:1px solid #eee" />
        //             <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        //                 <p>Mr Quick PH</p>
        //                 <p>Philippines</p>
        //             </div>
        //             </div>
        //         </div>
        //         <!-- partial -->
                    
        //         </body>
        //         </html>`
        //     )
        // }else{
        //     console.log("none");
        // }
        const mailResponse =await mailSender(
            email,
            "Mr. Quick Fix",
            `<!DOCTYPE html>
            <html lang="en" >
            <head>
                <meta charset="UTF-8">
                <title>Mr. Quick Fix</title>
                
            
            </head>
            <body>
            <!-- partial:index.partial.html -->
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Mr Quick </a>
                </div>
                <p style="font-size:1.1em">Hi,</p>
                <p>Good Day! This email is to inform you that our staff will contact you for the next visitation for the project. </p>
                <p>Please be advice that we will contact you using the phone number that you provided.</p>
                 <p> Thank you for trusting Mr. Quick Fix </p>
                
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
            </html>`)
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

export const sentEmailForInspection = async (req,res)=>{
    const {clientFirstName,clientLastName,email,clientsAddress,typeOfJob,jobCategory,jobStatus,
        contactNumber,jobAdmin,dateStarted,dateEnded, inspectionSchedule
    } = req.body;
    try{
        const result = await joborders.create({clientFirstName,clientLastName,email,clientsAddress,typeOfJob,jobCategory,jobStatus,
            contactNumber,jobAdmin,dateStarted,dateEnded,inspectionSchedule
        });
        const sched = new Date(inspectionSchedule).toLocaleDateString();
        console.log(sched);
        const mailResponse = await mailSender(
            email,
            "Mr Quick Inspection Notice",
            `<!DOCTYPE html>
            <html lang="en" >
            <head>
                <meta charset="UTF-8">
                <title>Mr Quick Schedule for Inspection</title>
                
            
            </head>
            <body>
            <!-- partial:index.partial.html -->
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Mr Quick Inspection Schedule</a>
                </div>
                <p style="font-size:1.1em">Hi,</p>
                <p>This email is to inform you that you have schedule for occular inspection with us at ${sched}</p>
                <p>Please be advice that we will contact you using the phone number that you provided.</p>
                 <p> </p>
                
                <p style="font-size:0.9em;">Regards,<br />Mr. Quick</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                    <p>Mr Quick PH</p>
                    <p>Philippines</p>
                </div>
                </div>
            </div>
            <!-- partial -->
                
            </body>
            </html>`
        )
        res.status(200).json({message:"Email Sent"});
    }
    catch(err){
        res.status(404).json({message:err.message})
    }
}

export default router;