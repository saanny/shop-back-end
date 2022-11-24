import express, { Application } from "express";
import boot from "./boot";
import "./infrastructure/connections/mongoose";
import notFoundHandler from "./middlewares/404";
import HumanErrorHandleing from "./middlewares/HumanErrorHandeling";
import RouteService from "./router/routeService";

class App {
    public app: Application;
    private router: RouteService;
    public port: number;

    constructor(port: number) {
        this.app = express();
        this.port = port;
        this.router = new RouteService(this.app);
    }

    public start(): void {
        boot(this.app);
        this.router.run();
        notFoundHandler(this.app);
        HumanErrorHandleing(this.app);
        this.app.listen(this.port, () => {
            console.log(`app is running on port ${this.port}`);
        });
    }
}

export default App;