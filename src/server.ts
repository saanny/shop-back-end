import dotenv from 'dotenv';
import App from "./app";
import { PORT } from './conf';

dotenv.config()
const port: number = Number(PORT);
const application = new App(port);
application.start();
