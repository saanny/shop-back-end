import 'reflect-metadata'
import dotenv from 'dotenv';
import App from "./app";
import { PORT } from './conf';
import './components/Auth/Controller';

dotenv.config()
const port: number = Number(PORT);
const application = new App(port);
application.start();
