import mongoose from "mongoose";

const ImageSchema = mongoose.Schema({
    imagess:{type:String,required:true},
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    role:{type:String,required:true}
}); 

export default mongoose.model("image-upload",ImageSchema)