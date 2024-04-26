import * as bodyParser from "body-parser";
import cors from "cors";
import express, { Application } from "express";
import mongoSanitize from "express-mongo-sanitize";
import path, { resolve } from "path";
import morgan from 'morgan'
import * as swagger from "swagger-express-ts";

const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};

export default function boot(app: Application) {

    app.use("/public", express.static(path.join(__dirname, "../../public")));
    app.use(express.static(resolve("public")));
    app.set("view engine", "pug");
    app.set("views", express.static(path.join(__dirname, "../../views")));
    app.use(morgan("dev"))
    app.use( '/api-docs/swagger' , express.static(path.join(__dirname, "../swagger")  ) );
    app.use( '/api-docs/swagger/assets' , express.static( path.join(__dirname, "../../node_modules/swagger-ui-dist")) );
    app.use(bodyParser.json());

    app.use(
        bodyParser.urlencoded({
            extended: false,
        })
    );
    app.use(cors(corsOptions));
    app.use(mongoSanitize());
    app.use( swagger.express(
        {
            definition : {
                info : {
                    title : "My api" ,
                    version : "1.0"
                } ,
                externalDocs : {
                    url : ""
                }
                // Models can be defined here
            }
        }
    ) );

}
