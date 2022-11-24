import * as bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express, { Application } from "express";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import path, { resolve } from "path";


const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};

export default function boot(app: Application) {

    app.use("/public", express.static(path.join(__dirname, "../../public")));
    app.use(express.static(resolve("public")));
    app.set("view engine", "pug");
    app.set("views", express.static(path.join(__dirname, "../../views")));

    // app.use(helmet());

    app.use(bodyParser.json());

    app.use(
        bodyParser.urlencoded({
            extended: false,
        })
    );
    app.use(cors(corsOptions));
    // app.use(mongoSanitize());

}
