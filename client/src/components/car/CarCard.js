import React, { useState } from "react";
import { Link } from "react-router-dom";
import BG from "./white-waves.webp";
import ShowImage from "./ShowImage";
import { isAuthenticated } from "../auth/index";
import { addToOrder } from "../manage-users/api";
import ErrorHandler from "../ErrorHandler/ErrorHandler";

function CarCard({ car, single }) {
  const { user } = isAuthenticated();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const showError = () => {
    return error && <ErrorHandler alertType={"error"} alertMessage={error} />;
  };
  const showSuccess = () => {
    return (
      success && <ErrorHandler alertType={"success"} alertMessage={success} />
    );
  };
  const bookBtn = () => {
    if (!user) {
      setError("Please signin to make order!");
    }
    if (user.role === 1) {
      setError("You can't add to order, you are admin!");
      return;
    }
    addToOrder(user._id, car._id).then((data) => {
      if (data.error) {
        setError(data.error);
      }
      setSuccess("Your booking is confirmed!");
    });
  };
  return (
    <div>
      <div className="h-10">
        {showSuccess()}
        {showError()}
      </div>
      <br />
      <div className="h-84 hover:shadow-md w-80 overflow-hidden rounded-lg">
        <ShowImage car={car} url="car" />
        <div
          className="flex flex-col p-2 py-4"
          style={{
            backgroundImage: `url(${BG})`,
          }}
        >
          {single === false && (
            <h2 className="text-3xl strong">Rs.{car.carPrice}/1km</h2>
          )}
          <h3 className="text-lg">
            {car.carMake}-{car.carModel}
          </h3>
          <br />
          <div className="flex justify-between items-center">
            <button
              className="black border border-yellow-500 px-4 hover:bg-yellow-500 hover:text-white hover:border-none rounded-2xl"
              onClick={bookBtn}
            >
              Book Now
            </button>
            {single === false && (
              <button className="border border-blue-500 px-4 hover:bg-blue-500 hover:text-white hover:border-none rounded-2xl">
                <Link to={`/car/${car._id}`} state={{ carId: car._id }}>
                  View
                </Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarCard;
