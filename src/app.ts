import express, { Application } from "express";
import "./infrastructure/connections/mongoose";
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

    public async start() {
        this.router.run();
        this.app.listen(this.port, () => {
            console.log(`app is running on port ${this.port}`);
        });
    }
}

export default App;