import { DeliveryRoute } from "../types/DeliveryRoute";

const deliveryRouteValidate = ({ location }: DeliveryRoute) => {
  return !!location.trim();
};

export default deliveryRouteValidate;
