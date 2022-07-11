import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

export const contato = async (req: Request, res: Response) => {
    //configurar o transporter
    let transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "d8415081b7f2d1",
          pass: "4619f7fbde9413"
        }
    });

    //configurar a mensagem
    let message = {
        from: 'Breno <breno@gmail.com>',
        to: 'teste@gmail.com',
        subject: 'Assunto do email',
        html: 'Opa <strong>Teste</strong> jdjdjd dhdhdshd',
        text: 'Opa Teste jdjdjd dhdhdshd'
    };

    //enviar a mensagem
    let info = await transport.sendMail(message);
    console.log(info);
    
    res.json({success: true});
}
