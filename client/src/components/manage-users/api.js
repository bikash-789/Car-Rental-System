export const getAllUsers = () => {
  return fetch(`http://localhost:8000/users`, {
    method: "GET",
  })
    .then((data) => data.json())
    .catch((err) => err);
};

export const addToOrder = (userId, carId) => {
  return fetch(`http://localhost:8000/user/${userId}/add/order/${carId}`, {
    method: "GET",
  })
    .then((data) => data.json())
    .catch((err) => err);
};

export const getAllOrders = (userId) => {
  return fetch(`http://localhost:8000/user/${userId}/get/orders`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => err);
};
