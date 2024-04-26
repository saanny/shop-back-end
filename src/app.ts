import { InversifyExpressServer } from 'inversify-express-utils'
import boot from "./boot";
import "./infrastructure/connections/mongoose";
import notFoundHandler from "./middlewares/404";
import HumanErrorHandleing from "./middlewares/HumanErrorHandeling";
import { container } from './di-container'


class App {
    public port: number;

    constructor(port: number) {
        this.port = port;
    }

    public start(): void {
        const server = new InversifyExpressServer(container); 

        server.setConfig((app) => {
            boot(app);
        });

        server.setErrorConfig((app) => {
            notFoundHandler(app);
            HumanErrorHandleing(app);
        });
        const app = server.build();

        app.listen(this.port, () => {
            console.log(`app is running on port ${this.port}`);
        });
    }
}

export default App;