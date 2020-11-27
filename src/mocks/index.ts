export default {
  routeCost: [
    { from: "A", to: "B", cost: 1 },
    { from: "A", to: "C", cost: 4 },
    { from: "A", to: "D", cost: 10 },
    { from: "B", to: "E", cost: 3 },
    { from: "C", to: "D", cost: 4 },
    { from: "C", to: "F", cost: 2 },
    { from: "D", to: "E", cost: 1 },
    { from: "E", to: "B", cost: 3 },
    { from: "E", to: "A", cost: 2 },
    { from: "F", to: "D", cost: 1 },
  ],
  deliveryRoute: [
    { location: "E" },
    { location: "A" },
    { location: "C" },
    { location: "F" },
  ],
};
