import React from "react";

function ShowImage({ car, url }) {
  return (
    <div className="h-44 overflow-hidden">
      <img
        src={`http://localhost:8000/${url}/photo/${car._id}`}
        alt={car.carModel}
        className="object-cover h-full w-full"
      />
    </div>
  );
}

export default ShowImage;
