import React, { useState, useEffect } from "react";
import { read } from "./carAPI";
import { useLocation } from "react-router-dom";
import CarCard from "./CarCard";
import Features from "./Features";
function Car() {
  const location = useLocation();
  const { carId } = location.state;
  const [car, setCar] = useState({});
  const [error, setError] = useState(false);
  const loadSingleCar = (carID) => {
    read(carID).then((data) => {
      if (data && data.error) {
        setError(data.error);
      } else {
        setCar(data);
      }
    });
  };
  useEffect(() => {
    loadSingleCar(carId);
  }, []);
  return (
    <div className="flex justify-center mt-16">
      <div className="p-4 flex flex-wrap justify-center align-center space-x-8 shadow-lg mt-8 rounded-md">
        <CarCard car={car} url="car" single={true} />
        <Features car={car} />
      </div>
    </div>
  );
}

export default Car;
