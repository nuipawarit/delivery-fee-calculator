import { RouteCost } from "../types/RouteCost";

const routeCostValidate = ({ from, to, cost }: RouteCost) => {
  return !!from.trim() && !!to.trim() && +cost > 0;
};

export default routeCostValidate;
