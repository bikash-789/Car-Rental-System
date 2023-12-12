import React, { useEffect, useState } from "react";
import Template from "./Template";
import { getAllUsers } from "./api";
import Error from "../ErrorHandler/ErrorHandler";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  function loadAllUsers() {
    setLoading(true);
    getAllUsers().then((data) => {
      setLoading(false);
      if (data.error) {
        setError(data.error);
      }
      if (data.users.length == 0) {
        setError("No registered users!");
      }

      setUsers(data.users);
    });
  }

  useEffect(loadAllUsers, []);
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
          <h1>View all registered users</h1>
          <br />
          {!error && (
            <table>
              <th>
                <td>User ID</td>
              </th>
              <th>
                <td>Name</td>
              </th>
              <th>
                <td>Email</td>
              </th>
              <th>
                <td>Phone</td>
              </th>
              <th>
                <td>Address</td>
              </th>
              <tbody>
                {users.length > 0 &&
                  users.map((user) => {
                    const { name, email, phone, address, _id } = user;
                    return (
                      <tr key={_id}>
                        <td>{_id}</td>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{phone}</td>
                        <td>{address}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Template>
  );
}
export default AllUsers;
