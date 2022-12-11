import express from "express";
import { sendMail } from "./emailscript";
const routerEmail = express.Router();

routerEmail.post("/email", sendMail);

export default routerEmail;