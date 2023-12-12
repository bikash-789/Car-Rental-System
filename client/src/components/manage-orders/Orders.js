import React, { useEffect, useState } from "react";
import Template from "../manage-orders/Template";
import { getAllOrders } from "../manage-users/api";
import Error from "../ErrorHandler/ErrorHandler";

function Orders() {
  const [ods, setOrders] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  function loadAllOrders() {
    setLoading(true);
    getAllOrders().then((data) => {
      setLoading(false);
      if (data.error) {
        setError(data.error);
      }
      if (data.allOrders.length === 0) {
        setError("No orders yet!");
      }
      setOrders(data.allOrders);
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
          <h1>View all orders</h1>
          <br />
          <table>
            <th>
              <td>Ordered By</td>
            </th>
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
            <tbody>
              {ods &&
                ods.length > 0 &&
                ods.map((obj) => {
                  const { orderedBy, orders } = obj;
                  return orders.map((car, index) => {
                    const {
                      carMake,
                      carColor,
                      carCapacity,
                      carPrice,
                      carId,
                      carModel,
                    } = car;
                    return (
                      <tr key={index}>
                        <td>{orderedBy}</td>
                        <td>{carId}</td>
                        <td>{carMake}</td>
                        <td>{carModel}</td>
                        <td>{carPrice}</td>
                        <td>{carColor}</td>
                        <td>{carCapacity}</td>
                      </tr>
                    );
                  });
                })}
            </tbody>
          </table>
        </div>
      </div>
    </Template>
  );
}
export default Orders;
