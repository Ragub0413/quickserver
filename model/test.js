import mongoose from "mongoose";

const testSchrema = mongoose.Schema({
    name:{
        type: String,
        required: true
    }
})
var Test = mongoose.model("Test", testSchrema)
export default Test;