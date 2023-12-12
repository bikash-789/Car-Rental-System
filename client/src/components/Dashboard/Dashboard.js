import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/index";
import Cards from "./Cards";
import { getAllCars } from "../car/carAPI";
import { getUsersCount } from "../user/api";
import { getOrdersCount } from "../manage-orders/api";
function Dashboard() {
  const { user } = isAuthenticated();
  const { name, email, address, phone } = user;
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState(0);
  const [orders, setOrders] = useState(0);
  const loadCars = () => {
    getAllCars().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCars(data.cars);
      }
    });
  };
  const loadUsers = () => {
    getUsersCount().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setUsers(data.userCount);
      }
    });
  };
  const loadOrders = () => {
    getOrdersCount().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setOrders(data.totalOrders);
      }
    });
  };
  useEffect(() => {
    loadCars();
    loadUsers();
    loadOrders();
  }, []);

  const bg = {
    order: {
      background:
        "linear-gradient(45deg, hsla(43, 100%, 85%, 1) 0%, hsla(0, 47%, 93%, 1) 100%)",
      color: "rgba(112, 112, 112, 0.58)",
    },
  };
  return (
    <>
      <br />
      <br />
      <div className="grid grid-flow-row-dense grid-cols-4 gap-2 p-4 mt-16">
        <div className="col-span-3 h-96 flex flex-wrap justify-around py-5 shadow-md">
          <Cards
            title={"Orders"}
            counts={orders}
            desc={"Manage Orders"}
            bg={bg.order}
            linkTo={"/admin/manage/orders"}
          />
          <Cards
            title={"Cars"}
            counts={cars.length}
            desc={"Manage cars"}
            bg={bg.order}
            linkTo={"/admin/manage/cars/add"}
          />
          <Cards
            title={"Users"}
            counts={users}
            desc={"Manage users"}
            bg={bg.order}
            linkTo={"/admin/manage/users"}
          />
        </div>
        <div className="shadow-md flex flex-col justify-start items-center py-4">
          <div className="rounded-full shadow-lg bg-orange-400 w-32 h-32 border-1 border-red-500">
            <img
              src={`http://localhost:8000/user/photo/${user._id}`}
              alt="user"
              className="rounded-full h-full w-full"
            />
          </div>
          <br />
          <div className="text-center bg-gray-100 p-2 px-6 rounded-lg">
            <h1 className="text-2xl my-2 font-bold">{name}</h1>
            <h3 className="text-sm my-2 font-semibold">{email}</h3>
            <h3 className="text-sm my-2 font-semibold">{address}</h3>
            <h3 className="text-sm my-2 font-semibold">+91-{phone}</h3>
            <h3
              className="text-md my-2 py-1 text-center"
              style={{
                backgroundColor: "#A8D26D",
                color: "white",
                borderRadius: "7px",
              }}
            >
              Admin 👨‍💼
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
