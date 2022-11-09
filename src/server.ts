import App from "./app";
import { PORT } from "./conf";

const port: number = 5000;
const application = new App(port);
application.start();
