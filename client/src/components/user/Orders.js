import React, { useEffect, useState } from "react";
import Template from "./Template";
import { getAllOrders } from "./api";
import Error from "../ErrorHandler/ErrorHandler";
import { isAuthenticated } from "../auth/index";

function Orders() {
  const [ods, setOrders] = useState([]);
  const [error, setError] = useState(false);
  const { user } = isAuthenticated();
  const [loading, setLoading] = useState(false);
  function loadAllOrders() {
    setLoading(true);
    getAllOrders(user._id).then((data) => {
      setLoading(false);
      if (data.error) {
        setError(data.error);
      }
      if (data.orders.length == 0) {
        setError("No orders yet!");
      }
      setOrders(data.orders);
    });
  }

  useEffect(loadAllOrders, []);
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
    <Template title="Orders">
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
          <h1>View all orders</h1>
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
              <td>Car Price</td>
            </th>
            <th>
              <td>Car Color</td>
            </th>
            <th>
              <td>Car Capacity</td>
            </th>
            <th>
              <td>Car Type</td>
            </th>
            <th>
              <td>Status</td>
            </th>
            <tbody>
              {ods.length > 0 &&
                ods.map((obj) => {
                  const {
                    carMake,
                    carColor,
                    carCapacity,
                    carPrice,
                    carId,
                    carModel,
                    carType,
                  } = obj;
                  return (
                    <tr key={carId}>
                      <td>{carId}</td>
                      <td>{carMake}</td>
                      <td>{carModel}</td>
                      <td>{carPrice}/- per day</td>
                      <td>{carColor}</td>
                      <td>{carCapacity}</td>
                      <td>{carType}</td>
                      <td>
                        <span className="px-3 py-0.5 text-white rounded-lg bg-green-500">
                          Approved
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </Template>
  );
}
export default Orders;
