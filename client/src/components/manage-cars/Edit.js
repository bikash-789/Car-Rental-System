import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { getAllCars, read, deleteCar } from "../car/carAPI";
import Template from "./Template";
import Error from "../ErrorHandler/ErrorHandler";

function Edit() {
  const { user, token } = isAuthenticated();
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const loadCars = () => {
    setLoading(true);
    getAllCars().then((data) => {
      setLoading(false);
      if (data.error) {
        setError(data.error);
      }
      if (data.cars.length == 0) setError("No cars found!");
      setCars(data.cars);
    });
  };
  useEffect(loadCars, []);
  //function to handle update button
  const handleUpdate = async (carId) => {
    const res = await read(carId);
    navigate("/admin/manage/cars/update", { state: res });
  };
  //function to handle delete button
  const handleDelete = async (carId) => {
    await deleteCar(user._id, token, carId).then(loadCars);
  };

  const showLoading = () => {
    return (
      loading && (
        <Error
          alertMessage={"Please wait for a moment..."}
          alertType={"loading"}
        />
      )
    );
  };
  const showError = () => {
    return error && <Error alertType={"error"} alertMessage={error} />;
  };

  return (
    <Template>
      {showError()}
      {showLoading()}
      <style>{`
    table, th, tr, td{
        border: 1px solid black;
    }

    tr,td{
        text-align: center;
        padding: 3px 25px;
        font-size: 1.3rem;
    }
    td:nth-child(1)
    {
      border: none;
    }
  `}</style>
      <div className="flex flex-col justify-center text-2xl p-6">
        <div className="shadow-lg px-8 py-4 bg-amber-100 rounded-md">
          <h1>Cars</h1>
          <br />
          <table>
            <th>
              <td>ID</td>
            </th>
            <th>
              <td>Car Make</td>
            </th>
            <th>
              <td>Car Model</td>
            </th>
            <th>
              <td>Update</td>
            </th>
            <th>
              <td>Delete</td>
            </th>
            <tbody>
              {cars.length > 0 &&
                cars.map((car, index) => {
                  return (
                    <tr key={car._id}>
                      <td>{car.carId}</td>
                      <td>{car.carMake}</td>
                      <td>{car.carModel}</td>
                      <td>
                        <button
                          className="bg-green-700 px-3 rounded-md text-white text-sm"
                          onClick={() => handleUpdate(car._id)}
                        >
                          Update
                        </button>
                      </td>
                      <td>
                        <button
                          className="bg-red-700 px-2 rounded-md text-white text-sm"
                          onClick={() => handleDelete(car._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              <tr></tr>
            </tbody>
          </table>
        </div>
      </div>
    </Template>
  );
}
export default Edit;
