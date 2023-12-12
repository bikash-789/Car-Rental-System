import React from "react";
import { useState } from "react";
import Template from "./Template";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import { addCar } from "../car/carAPI";
import { isAuthenticated } from "../auth/index";

function Add() {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    carMake: "",
    carModel: "",
    carColor: "",
    carPrice: "",
    carType: "",
    carId: "",
    carPhoto: "",
    carCapacity: "",
    setError: "",
    formData: new FormData(),
    loading: false,
    setSuccess: false,
    addedCar: "",
  });
  const {
    carMake,
    carModel,
    carColor,
    carPrice,
    carId,
    carCapacity,
    setError,
    setSuccess,
    addedCar,
    loading,
    formData,
  } = values;

  const handleChange = (name) => (event) => {
    const value =
      name === "carPhoto" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
    console.log(name, value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      setError: "",
      loading: true,
    });
    addCar(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, setError: data.error });
      } else {
        setValues({
          carMake: "",
          carModel: "",
          carColor: "",
          carPrice: "",
          carType: "",
          carId: "",
          carCapacity: "",
          loading: false,
          setSuccess: true,
          setError: false,
          formData: new FormData(),
          addedCar: data.carMake + "-" + data.carModel,
        });
      }
    });
  };
  const showMsg = () => {
    return (
      (setError || setSuccess) && (
        <ErrorHandler
          alertMessage={
            loading
              ? "Loading..."
              : setError
              ? setError
              : addedCar + " was added successfully!"
          }
          alertType={loading ? "loading" : setError ? "error" : "success"}
        />
      )
    );
  };
  return (
    <Template>
      <style>{`
    input{
      margin: 2px;
      border-radius: 6px;
      padding: 2px 4px;
      background: hsl(60, 29%, 89%);
    }
  `}</style>
      <div className="flex flex-col justify-center text-2xl p-6 mb-48">
        {showMsg()}
        <br />
        <form
          className="shadow-lg px-8 py-4 bg-amber-100 rounded-md"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl text-amber-400">Add Car</h1>
          <br />
          <table className="px-2">
            <tr>
              <td>Car Make</td>
              <td>
                <input
                  type="text"
                  name="carMake"
                  value={carMake}
                  onChange={handleChange("carMake")}
                />
              </td>
            </tr>
            <tr>
              <td>Car Model</td>
              <td>
                <input
                  type="text"
                  name="carModel"
                  value={carModel}
                  onChange={handleChange("carModel")}
                />
              </td>
            </tr>
            <tr>
              <td>Car Color</td>
              <td>
                <input
                  type="text"
                  name="carColor"
                  value={carColor}
                  onChange={handleChange("carColor")}
                />
              </td>
            </tr>
            <tr>
              <td>Car Price</td>
              <td>
                <input
                  type="text"
                  name="carPrice"
                  value={carPrice}
                  onChange={handleChange("carPrice")}
                />
              </td>
            </tr>
            <tr>
              <td>Car Type</td>
              <td>
                <input
                  type="radio"
                  name="carType"
                  value="Petrol"
                  onChange={handleChange("carType")}
                />
                <label htmlFor="carType" />
                Petrol &nbsp;
                <input
                  type="radio"
                  name="carType"
                  value="Diesel"
                  onChange={handleChange("carType")}
                />
                <label htmlFor="carType" />
                Diesel &nbsp;
                <input
                  type="radio"
                  name="carType"
                  value="EV"
                  onChange={handleChange("carType")}
                />
                <label htmlFor="carType" />
                EV
              </td>
            </tr>
            <tr>
              <td>Car Capacity</td>
              <td>
                <input
                  type="number"
                  name="carCapacity"
                  min={2}
                  onChange={handleChange("carCapacity")}
                  value={carCapacity}
                />
              </td>
            </tr>
            <tr>
              <td>Car ID</td>
              <td>
                <input
                  type="text"
                  name="carId"
                  value={carId}
                  onChange={handleChange("carId")}
                />
              </td>
            </tr>
            <tr>
              <td>Car Image</td>
              <td>
                <input
                  type="file"
                  name="carPhoto"
                  accept=".jpg,.png,.jpeg,.webp"
                  onChange={handleChange("carPhoto")}
                />
              </td>
            </tr>
          </table>
          <br />
          <input
            type="submit"
            value="Submit"
            className="rounded-md w-24 hover:shadow-md text-xl px-3 py-1 bg-zinc-700 text-amber-400"
          />
        </form>
      </div>
    </Template>
  );
}

export default Add;
