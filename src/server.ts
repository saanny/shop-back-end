import dotenv from 'dotenv';
import App from "./app";

dotenv.config()
const port: number = Number(process.env.PORT);
const application = new App(port);
application.start();
