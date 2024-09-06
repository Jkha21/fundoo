import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


export async function sendResetPasswordEmail(email: string, token: string): Promise<any> {
    const transporter = createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL,
            pass: process.env.PASSWORD,
        },
    });

    const mailOptions = {
        to: email,
        from: `${process.env.GMAIL}`,
        subject: 'Password Reset',
        text: `reset your password using this token: ${token}`,
        html: `<h1>Hello,<br><br>Click on given link to reset your password!</h1><br><h1>Link:<a href="http://localhost:${process.env.APP_PORT}/${token}">Click here</a></h1>`
    };

    await transporter.sendMail(mailOptions);

}

