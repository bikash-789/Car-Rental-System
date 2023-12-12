const ods = [
  {
    orderedBy: "6368190138fc3a9cc9fb4b34",
    orders: [
      {
        _id: "635d76b1c2a67a92f521174d",
        carMake: "BMW",
        carModel: "BMW X5",
        carColor: "White",
        carPrice: "6500000",
        carType: "Petrol",
        carId: "6446",
        carCapacity: "6",
        __v: 0,
      },
      {
        _id: "635d76b1c2a67a92f521174d",
        carMake: "BMW",
        carModel: "BMW X5",
        carColor: "White",
        carPrice: "6500000",
        carType: "Petrol",
        carId: "6446",
        carCapacity: "6",
        __v: 0,
      },
      {
        _id: "635d76b1c2a67a92f521174d",
        carMake: "BMW",
        carModel: "BMW X5",
        carColor: "White",
        carPrice: "6500000",
        carType: "Petrol",
        carId: "6446",
        carCapacity: "6",
        __v: 0,
      },
      {
        _id: "635d76b1c2a67a92f521174d",
        carMake: "BMW",
        carModel: "BMW X5",
        carColor: "White",
        carPrice: "6500000",
        carType: "Petrol",
        carId: "6446",
        carCapacity: "6",
        __v: 0,
      },
    ],
  },
  {
    orderedBy: "636a8bab216f081d7fa9db04",
    orders: [
      {
        _id: "635d76b1c2a67a92f521174d",
        carMake: "BMW",
        carModel: "BMW X5",
        carColor: "White",
        carPrice: "6500000",
        carType: "Petrol",
        carId: "6446",
        carCapacity: "6",
        __v: 0,
      },
      {
        _id: "635d76b1c2a67a92f521174d",
        carMake: "BMW",
        carModel: "BMW X5",
        carColor: "White",
        carPrice: "6500000",
        carType: "Petrol",
        carId: "6446",
        carCapacity: "6",
        __v: 0,
      },
    ],
  },
];

ods.map((obj) => {
  const { orderedBy, orders } = obj;
  console.log(orderedBy);
  orders.map((car) => {
    const { carMake, carColor, carType, carPrice } = car;
    console.log(carMake);
  });
});
