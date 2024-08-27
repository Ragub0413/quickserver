import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';


import testRoute from './routes/test.js';
import loginRoute from './routes/login.js';

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

app.use('/test',testRoute);
app.use('/employee',loginRoute);

//const CONNECTION_DB ='mongodb+srv://mrquick:adminsidemrquick111@cloudsourcing.kmb2zsa.mongodb.net/?retryWrites=true&w=majority&appName=CloudSourcing';

//const CONNECTION_DB ='mongodb+srv://mrquick:adminsidemrquick111@cloudsourcing.kmb2zsa.mongodb.net/';
// const PORT = 3000;
// mongoose.connect(CONNECTION_DB)
//     .then(()=>app.listen(PORT, ()=>console.log(`Server running on port: ${PORT}`)))
//     .catch((error) => console.log(`${error} did not connect`));

app.listen(3000,()=>{
    console.log("start server");
});
