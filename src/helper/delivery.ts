import { RouteCost } from "../types/RouteCost";

export const findRoute = (routes: RouteCost[], form: string, to: string) =>
  routes.find((route) => route.from === form && route.to === to) || null;
