import React from "react";
import { Link } from "react-router-dom";
function Features({ car }) {
  return (
    <div className="text-lg">
      <h1 className="text-4xl text-slate-800">Car Details</h1>
      <br />
      <table className="border p-4 border-spacing-0.5">
        <tr className="border border-red-200">
          <td className="bg-orange-200 p-2">Car Make</td>
          <td className="text-2xl">:</td>
          <td className="bg-slate-200 p-2">{car.carMake}</td>
        </tr>
        <tr className="border border-red-200">
          <td className="bg-orange-200 p-2">Car Model</td>
          <td className="text-2xl">:</td>
          <td className="bg-slate-200 p-2">{car.carModel}</td>
        </tr>
        <tr className="border border-red-200">
          <td className="bg-orange-200 p-2">Car Color</td>
          <td className="text-2xl">:</td>
          <td className="bg-slate-200 p-2">{car.carColor}</td>
        </tr>
        <tr className="border border-red-200">
          <td className="bg-orange-200 p-2">Car Price</td>
          <td className="text-2xl">:</td>
          <td className="bg-slate-200 p-2">Rs.{car.carPrice}</td>
        </tr>
        <tr className="border border-red-200">
          <td className="bg-orange-200 p-2">Car Type</td>
          <td className="text-2xl">:</td>
          <td className="bg-slate-200 p-2">{car.carType}</td>
        </tr>
        <tr className="border border-red-200">
          <td className="bg-orange-200 p-2">Car Capacity</td>
          <td className="text-2xl">:</td>
          <td className="bg-slate-200 p-2">{car.carCapacity} Seaters</td>
        </tr>
        <tr className="border border-red-200">
          <td className="bg-orange-200 p-2">Car ID</td>
          <td className="text-2xl">:</td>
          <td className="bg-slate-200 font-serif p-2">{car.carId}</td>
        </tr>
      </table>
      <br />
      <Link
        to="/cars"
        className="bg-blue-500 text-white px-4 py-2 my-4 rounded-md hover:shadow-md"
      >
        Go Back
      </Link>
    </div>
  );
}

export default Features;
