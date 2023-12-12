import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/index";
import Cards from "./Cards";
import { getUserById } from "../user/api";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import { ShoppingBagIcon, PencilIcon } from "@heroicons/react/24/outline";
function UserDashboard() {
  const [values, setValues] = useState([]);
  const { user } = isAuthenticated();
  const [loading, setLoading] = useState(false);
  const loadUser = () => {
    setLoading(true);
    getUserById(user._id).then((data) => {
      setLoading(false);
      if (data.user) {
        setValues(data.user);
      }
    });
  };
  useEffect(loadUser, []);

  const { name, email, address, phone, _id } = values;
  const showLoading = () => {
    return (
      loading && (
        <ErrorHandler
          alertMessage={"Please wait for a moment..."}
          alertType={"loading"}
        />
      )
    );
  };
  const bg = {
    order: {
      background:
        "linear-gradient(45deg, hsla(43, 100%, 85%, 1) 0%, hsla(0, 47%, 93%, 1) 100%)",
      color: "rgba(112, 112, 112, 0.58)",
    },
  };
  const orderIcon = <ShoppingBagIcon className="h-8 w-8" />;
  const profileIcon = <PencilIcon className="h-8 w-8" />;
  return (
    <>
      <div className="grid grid-flow-row-dense grid-cols-4 gap-2 p-4 mt-16">
        <div className="col-span-3 h-96 flex flex-wrap justify-around py-5 shadow-md">
          <Cards
            title={"My Orders"}
            desc={"View your orders"}
            bg={bg.order}
            counts={null}
            icon={orderIcon}
            linkTo={"/user/view/orders"}
          />
          <Cards
            title={"Edit Profile"}
            desc={"Update your profile"}
            bg={bg.order}
            counts={null}
            icon={profileIcon}
            linkTo={"/user/edit/profile"}
          />
        </div>
        <div className="shadow-md flex flex-col justify-start items-center py-4">
          {showLoading()}
          {!loading && (
            <>
              <div className="rounded-full shadow-lg bg-orange-400 w-32 h-32 border-1 border-red-500">
                <img
                  src={`http://localhost:8000/user/photo/${_id}`}
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
                  Registered User ☑️
                </h3>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
