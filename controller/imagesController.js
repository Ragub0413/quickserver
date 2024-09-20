import mongoose from 'mongoose';
import Image from '../model/images.js';
import multer from 'multer';

export const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,'public/images');

    },
    filename: function (req,file,cb){
        const uniqueSuffix = Date.now();
        cb(null,uniqueSuffix + file.originalname);
    }, 
});


const upload = multer({storage:storage});


export const imageupload = async (req,res)=>{
    const {imagess,firstName,lastName,role}=req.body;
    try{
        const imageName = req.file.filename;
        const result = await Image.create({imagess:imageName,firstName,lastName,role});
        res.status(201).json({result})

    }catch(err){
        res.json({status:err});
    }
}

export const getimageUploaded = async (req,res)=>{
    try{
        let result = await Image.find();
        res.send(result).status(200);

    }catch(err){
        res.status(400).json({message:err.message});
    }
}
