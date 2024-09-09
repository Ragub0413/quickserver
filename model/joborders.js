import mongoose from "mongoose";

const JobOrderSchema = mongoose.Schema({
    clientFirstName:{type: String},
    clientLastName:{type:String},
    email:{type:String},
    clientsAddress:{type:String},
    contactNumber:{type:String},
    typeOfJob:{type:String},
    jobCategory:{type:Array},
    jobStatus:{type:String},
    jobAdmin:{type:String},
    dateStarted:{type: String},
    dateEnded:{type: String},
});

export default mongoose.model("JobOrderCollection",JobOrderSchema)