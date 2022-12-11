import * as nodemailer from "nodemailer";
import { Request, Response, NextFunction } from "express";

export const sendMail = async (req: Request) => {
  const data = req.body;

  let email_user: string = "bruno.faller@universo.univates.br";
  let email_pass: string = "pcesbuajtfocekhj";
  let email_to: string = data.from;
  let email_subject: string = data.subject;
  let email_html: string = `
  <div>
  <h1  style="color:red;">${data.message}</h1>
  <p>${data.subject}</p>
  <p>Contato: ${data.from}</p>  
  </div>
  `;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email_user,
      pass: email_pass,
    },
  });

  let mailOptions = {
    from: email_user,
    to: email_to,
    subject: email_subject,
    html: email_html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Erro ao enviar email: " + error);
    } else {
      console.log("Email enviado: " + info.response);
    }
  })
}