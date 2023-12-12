import React, { useEffect } from "react";
import { useState } from "react";
import Template from "./Template";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import { updateCar } from "../car/carAPI";
import { useLocation } from "react-router-dom";
import { isAuthenticated } from "../auth/index";

function Update() {
  const location = useLocation();
  const {
    carMake,
    carModel,
    carColor,
    carPrice,
    carType,
    carId,
    carCapacity,
    _id,
  } = location.state;
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    carMake: carMake,
    carModel: carModel,
    carColor: carColor,
    carPrice: carPrice,
    carType: carType,
    carId: carId,
    carPhoto: "",
    carCapacity: carCapacity,
    setError: "",
    formData: new FormData(),
    loading: false,
    setSuccess: false,
    updatedCar: "",
  });
  const { setError, loading, setSuccess, updatedCar, formData } = values;
  useEffect(() => {
    formData.set("carMake", carMake);
    formData.set("carModel", carModel);
    formData.set("carColor", carColor);
    formData.set("carPrice", carPrice);
    formData.set("carId", carId);
    formData.set("carCapacity", carCapacity);
    formData.set("carType", carType);
  }, []);

  const handleChange = (name) => (event) => {
    const value =
      name === "carPhoto" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, loading: false, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      setError: "",
      loading: true,
    });
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    updateCar(_id, user._id, token, formData).then((response) => {
      if (response.error) {
        setValues({ ...values, loading: false, setError: response.error });
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
          updatedCar: response.carMake + "-" + response.carModel,
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
              : updatedCar + " was updated successfully!"
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
                  value={values.carMake}
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
                  value={values.carModel}
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
                  value={values.carColor}
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
                  value={values.carPrice}
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
                  value={values.carCapacity}
                />
              </td>
            </tr>
            <tr>
              <td>Car ID</td>
              <td>
                <input
                  type="text"
                  name="carId"
                  value={values.carId}
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

export default Update;
