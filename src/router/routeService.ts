import { Application, Router } from "express";
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


  }

  public run() {
    this.router.getRouters().forEach((router: Router, route: string) => {
      this.app.use(route, router);
    });
  }
}
export default RouteService;
