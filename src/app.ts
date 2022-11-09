import express, { Application } from "express";
import "./infrastructure/connections/postgre";
class App {
    public app: Application;
    public port: number;

    constructor(port: number) {
        this.app = express();
        this.port = port;
    }
    public async start() {
        this.app.listen(this.port, () => {
            console.log(`app is running on port ${this.port}`);
        });
    }
}
export default App;