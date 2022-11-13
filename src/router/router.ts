import { Router } from "express";

class RouteEngine {
  private routers: Map<string, Router> = new Map<string, Router>();

  public registerRouter(route: string, router: Router) {
    this.routers.set(route, router);
  }
  public getRouters() {
    return this.routers;
  }
}
export default RouteEngine;
