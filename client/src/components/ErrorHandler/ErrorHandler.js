import React from "react";
import "./Error.css";

function ErrorHandler({ alertType, alertMessage }) {
  const colorFormat = {
    loading: {
      alertType: {
        color: "orange",
      },
      alertMessage: {
        color: "#C6A15B",
      },
      alertBg: {
        backgroundColor: "#F2E86D",
      },
    },
    success: {
      alertType: {
        color: "#49A078",
      },
      alertMessage: {
        color: "#426A5A",
      },
      alertBg: {
        backgroundColor: "#B5DEAD",
      },
    },
    error: {
      alertType: {
        color: "#8D0801",
      },
      alertMessage: {
        color: "#b75222",
      },
      alertBg: {
        backgroundColor: "#DA9F93",
      },
    },
  };
  return (
    <div
      className="p-2 border-2 rounded-lg border-none alert"
      style={
        alertType === "loading"
          ? colorFormat.loading.alertBg
          : alertType === "success"
          ? colorFormat.success.alertBg
          : alertType === "error"
          ? colorFormat.error.alertBg
          : { display: "none" }
      }
    >
      <h1>
        <span
          className="font-extrabold capitalize"
          style={
            alertType === "loading"
              ? colorFormat.loading.alertType
              : alertType === "success"
              ? colorFormat.success.alertType
              : colorFormat.error.alertType
          }
        >
          {alertType}!
        </span>
        &nbsp; &nbsp;
        <span
          className="text-center"
          style={
            alertType === "loading"
              ? colorFormat.loading.alertMessage
              : alertType === "success"
              ? colorFormat.success.alertMessage
              : colorFormat.error.alertMessage
          }
        >
          {alertMessage}
        </span>
      </h1>
    </div>
  );
}

export default ErrorHandler;
