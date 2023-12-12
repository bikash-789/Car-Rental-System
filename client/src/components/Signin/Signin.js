import React from "react";
import { useState } from "react";
import Layout from "../../core/Layout";
import Error from "../ErrorHandler/ErrorHandler";
import "./Signin.css";
import { Link, useNavigate } from "react-router-dom";
import { authenticate, signin } from "../auth/index";
import { isAuthenticated } from "../auth/index";
import BG from "../car/white-waves.webp";
function Signin() {
  const { user } = isAuthenticated();
  //react hooks
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    redirectTo: null,
  });
  const { email, password, redirectTo } = userData;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  //on Change method
  const handleChange = (e) => {
    const { name, value } = e.target;
    setError(false);
    setLoading(false);
    setUserData({ ...userData, [name]: value });
  };

  //on submit method
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    signin({ email, password }).then((data) => {
      if (data.error) {
        setLoading(false);
        setError(data.error);
        setUserData({
          ...userData,
          redirectTo: false,
        });
      } else {
        authenticate(data, () => {
          setUserData({
            ...userData,
            redirectTo: true,
          });
          setError(false);
          setLoading(false);
        });
      }
    });
  };
  const RedirectUser = () => {
    const Navigate = useNavigate();
    if (redirectTo) {
      setUserData({ ...userData });
      setLoading(false);
      if (user && user.role == 1) return Navigate("/admin/dashboard");
      return Navigate("/user/dashboard");
    }
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
    <Layout className={`flex flex-col justify-center items-center p-3 mt-16`}>
      {showError()}
      {showLoading()}
      <div
        className="w-96 bg-white shadow-xl rounded-lg mt-4 py-4"
        style={{ backgroundImage: `url(${BG})` }}
      >
        <h1 className="register-heading px-6">Login</h1>
        <br />
        <form className="flex p-3 mx-10 flex-col">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
            className="px-3 py-1 rounded-lg input-bg outline-none placeholder:input-placeHolder"
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
            className="px-3 py-1 rounded-lg input-bg outline-none placeholder:input-placeHolder"
          />
          <br />
          <button
            className="submit-btn px-3 py-1 rounded-md w-24 cursor-pointer bg-yellow-main hover:bg-yellow-main text-t-black"
            onClick={handleSubmit}
          >
            Signin
          </button>
          <Link to="/forgotPassword" className="my-2">
            Forgot Password?
          </Link>
          <br />
          <div>
            <hr className="hr-line rounded-sm"></hr>
            <br />
            <span className="font-normal text-sm relative -top-9 z-1 bg-white px-1 left-32">
              OR
            </span>
          </div>
          <div>
            <span className="text-md">Don't have an account? &nbsp; </span>
            <Link
              to="/signup"
              className="border border-black px-4 py-1 rounded-3xl hover:bg-blue-500 hover:text-white hover:border-none"
            >
              Signup
            </Link>
          </div>
        </form>
      </div>
      <br />
      {RedirectUser()}
    </Layout>
  );
}

export default Signin;
