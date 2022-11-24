import { Application, Router } from "express";
import authRouter from "../components/Auth/Router";
import RouteEngine from "./router";

class RouteService {
  private app: Application;
  private router: RouteEngine;
  public constructor(app: Application) {
    this.app = app;
    this.router = new RouteEngine();
    this.bindRouters();
  }

  public bindRouters() {
    this.router.registerRouter("/api/v1/auth", authRouter);
  }

  public run() {
    this.router.getRouters().forEach((router: Router, route: string) => {
      this.app.use(route, router);
    });
  }
}
export default RouteService;
