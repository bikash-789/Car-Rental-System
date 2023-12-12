import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import SignIn from "./components/Signin/Signin";
import Home from "./core/Home";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./components/auth/PrivateRoutes";
import Vehicles from "./components/car/Vehicles";
import Car from "./components/car/Car";
import Add from "./components/manage-cars/Add";
import Edit from "./components/manage-cars/Edit";
import Update from "./components/manage-cars/Update";
import Orders from "./components/manage-orders/Orders";
import UserOrders from "./components/user/Orders";
import UserDashboard from "./components/Dashboard/UserDashboard";
import AdminRoutes from "./components/auth/AdminRoutes";
import AllUsers from "./components/manage-users/AllUsers";
import EditProfile from "./components/user/EditProfile";
import Footer from "./core/Footer";
function Routess() {
  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Navbar />
      {/* <Routes> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/cars" element={<Vehicles />} />
        <Route path="/car/:carID" exact element={<Car />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoutes>
              <Dashboard />
            </AdminRoutes>
          }
        />
        <Route
          path="/user/dashboard"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/edit/profile"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/view/orders"
          element={
            <PrivateRoute>
              <UserOrders />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/manage/cars/add"
          element={
            <AdminRoutes>
              <Add />
            </AdminRoutes>
          }
        />
        <Route
          path="/admin/manage/cars/edit"
          element={
            <AdminRoutes>
              <Edit />
            </AdminRoutes>
          }
        />
        <Route
          path="/admin/manage/cars/update"
          element={
            <AdminRoutes>
              <Update />
            </AdminRoutes>
          }
        />
        <Route
          path="/admin/manage/orders"
          element={
            <AdminRoutes>
              <Orders />
            </AdminRoutes>
          }
        />
        <Route
          path="/admin/manage/users"
          element={
            <AdminRoutes>
              <AllUsers />
            </AdminRoutes>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Routess;
