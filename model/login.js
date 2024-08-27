import mongoose from "mongoose";

const loginSchema = mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        require: true
    }

})
var Login = mongoose.model("Login", loginSchema)
export default Login;