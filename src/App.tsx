import { Box, Container, Divider, Paper, Typography } from "@material-ui/core";
import React, { useState } from "react";
import DeliveryRouteTable from "./components/DeliveryRouteTable";
import RouteCostTable from "./components/RouteCostTable";
import { findRoute } from "./helper/delivery";
import { DeliveryRoute } from "./types/DeliveryRoute";
import { RouteCost } from "./types/RouteCost";
import MOCKS from "./mocks";

function App() {
  const [routeCost, setRouteCost] = useState(MOCKS.routeCost);
  const [deliveryRoute, setDeliveryRoute] = useState(MOCKS.deliveryRoute);

  const onRouteCostChangeHandler = (value: RouteCost[]) => {
    setRouteCost(value);
  };

  const onDeliveryRouteChangeHandler = (value: DeliveryRoute[]) => {
    setDeliveryRoute(value);
  };

  const getTotalFee = () => {
    if (deliveryRoute.length <= 1) return null;

    let sum: number | null = 0;

    for (let idx = 1; idx < deliveryRoute.length; idx++) {
      const from = deliveryRoute[idx - 1].location;
      const to = deliveryRoute[idx].location;
      const route = findRoute(routeCost, from, to);

      if (route === null) {
        return null;
      }

      sum = sum + route.cost;
    }

    return sum;
  };

  const TotalFee = getTotalFee();

  return (
    <Container maxWidth="sm">
      <Box py={4}>
        <Box mb={4} mt={0} m={2}>
          <Typography variant="h4">🚚 Delivery fee calculator</Typography>
        </Box>
        <Box m={2}>
          <RouteCostTable
            data={routeCost}
            onChange={onRouteCostChangeHandler}
          />
        </Box>
        <Divider variant="middle" />
        <Box m={2}>
          <DeliveryRouteTable
            data={deliveryRoute}
            onChange={onDeliveryRouteChangeHandler}
            allRoute={routeCost}
          />
        </Box>
        <Divider variant="middle" />
        <Box m={2}>
          <Box
            component={Paper}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={3}
          >
            <Typography variant="h5">Calculated total fee</Typography>
            <Typography variant="h5">
              {TotalFee ? (
                <Typography color="primary" variant="h4">
                  {TotalFee}
                </Typography>
              ) : (
                <Typography color="error" variant="h5">
                  (No Such Route)
                </Typography>
              )}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default App;
