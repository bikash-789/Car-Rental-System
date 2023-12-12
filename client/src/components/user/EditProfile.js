import React, { useEffect } from "react";
import { useState } from "react";
import Template from "./Template";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import { updateProfile } from "./api";
import { isAuthenticated } from "../auth/index";

function EditProfile() {
  const { user, token } = isAuthenticated();
  const { name, phone, address, _id } = user;
  const [values, setValues] = useState({
    name: name,
    phone: phone,
    address: address,
    formData: new FormData(),
    loading: false,
    success: false,
    error: false,
  });
  const { formData, loading, success, error } = values;
  useEffect(() => {
    formData.set("name", name);
    formData.set("phone", phone);
    formData.set("address", address);
  }, []);

  const handleChange = (name) => (event) => {
    const value =
      name === "profilePhoto" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, loading: false, error: false });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    updateProfile(_id, token, formData).then((response) => {
      if (response.error) {
        setValues({ ...values, error: response.error, loading: false });
      } else {
        setValues({
          name: "",
          email: "",
          phone: "",
          address: "",
          formData: new FormData(),
          success: "Profile has been updated successfully!",
          error: false,
          loading: false,
        });
      }
    });
  };
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
  const showError = () => {
    return error && <ErrorHandler alertType={"error"} alertMessage={error} />;
  };
  const showSuccess = () => {
    return (
      success && <ErrorHandler alertType={"success"} alertMessage={success} />
    );
  };
  return (
    <Template title="Profile">
      <style>{`
    input{
      margin: 2px;
      border-radius: 6px;
      padding: 2px 4px;
      background: hsl(60, 29%, 89%);
    }
  `}</style>

      <div className="flex flex-col justify-center text-2xl p-6">
        {showLoading()}
        {showError()}
        {showSuccess()}
        <br />
        <form
          className="shadow-lg px-8 py-4 bg-amber-100 rounded-md"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl text-amber-400">Update Profile</h1>
          <br />
          <table className="px-2">
            <tr>
              <td>Name</td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange("name")}
                />
              </td>
            </tr>
            <tr>
              <td>Address</td>
              <td>
                <input
                  type="text"
                  name="address"
                  value={values.address}
                  onChange={handleChange("address")}
                />
              </td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>
                <input
                  type="text"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange("phone")}
                />
              </td>
            </tr>
            <tr>
              <td>Profile Photo</td>
              <td>
                <input
                  type="file"
                  name="profilePhoto"
                  accept=".jpg,.png,.jpeg,.webp"
                  onChange={handleChange("profilePhoto")}
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

export default EditProfile;
