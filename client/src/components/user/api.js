//let's create a method to get users
export const getAllUsers = () => {
  return fetch(`http://localhost:8000/users`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => err);
};

// let's create a method to get users count
export const getUsersCount = () => {
  return fetch(`http://localhost:8000/users/count`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => err);
};

// Let's create a method to edit user profile
export const updateProfile = (userId, token, user) => {
  return fetch(`http://localhost:8000/user/update/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: user,
  })
    .then((response) => response.json())
    .catch((err) => err);
};

export const getUserById = (userId) => {
  return fetch(`http://localhost:8000/user/${userId}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => err);
};

export const getAllOrders = (userId) => {
  return fetch(`http://localhost:8000/user/${userId}/get/orders`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => err);
};
