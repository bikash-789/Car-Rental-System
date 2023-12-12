import { isAuthenticated } from "../auth";

//let's create a method to get cars
export const getAllCars = () => {
  return fetch(`http://localhost:8000/cars`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => err);
};

//read function
export const read = (carID) => {
  return fetch(`http://localhost:8000/car/${carID}`, {
    method: "GET",
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Create a method to post a new car
export const addCar = (userId, token, car) => {
  return fetch(`http://localhost:8000/car/add/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: car,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return err;
    });
};

// Create a method to update a car
export const updateCar = async (carId, userId, token, car) => {
  return fetch(`http://localhost:8000/car/update/${carId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: car,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return err;
    });
};

// Create a method to delete a car by id
export const deleteCar = async (userId, token, carId) => {
  if (isAuthenticated()) {
    return fetch(`http://localhost:8000/car/delete/${carId}/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => err);
  }
};
