import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    secure:true,
    host:'smtp.gmail.com',
    port: 465,
    auth:{
        user:'mrquickofficialph@gmail.com',
        pass:'dxviwdorgyeutbur'
    }
});

function sendMail(to,sub,msg){
    transporter.sendMail({
        to:to,
        subject:sub,
        html:msg
    });
    console.log('sent')
}

sendMail("angelicaragub0013@gmail.com","This subject","Sample message")