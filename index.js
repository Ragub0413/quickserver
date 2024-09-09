import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';


import testRoute from './routes/test.js';
import loginRoute from './routes/login.js';
import employeeRoute from './routes/employee.js';
import joborderRoute from './routes/joborder.js';

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

app.use('/test',testRoute);
app.use('/employee',loginRoute);
app.use('/employeedata',employeeRoute);
app.use('/jobordercollection',joborderRoute);
//const CONNECTION_DB ='mongodb+srv://mrquick:adminsidemrquick111@cloudsourcing.kmb2zsa.mongodb.net/?retryWrites=true&w=majority&appName=CloudSourcing';

const CONNECTION_DB = process.env.ATLAS_URI || "mongodb+srv://mrquick:adminsidemrquick111@cloudsourcing.kmb2zsa.mongodb.net/MrQuick?retryWrites=true&w=majority&appName=CloudSourcing";
const PORT = 5000;
mongoose.connect(CONNECTION_DB)
    .then(()=>app.listen(PORT, ()=>console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));

// app.listen(5000,()=>{
//     console.log("start server");
// });
