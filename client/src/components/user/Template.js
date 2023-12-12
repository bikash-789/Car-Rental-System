import React from "react";

function Template({ children, title }) {
  return (
    <div className="p-4 flex flex-wrap flex-col justify-center space-x-8 mt-16 rounded-md">
      <h1 className="text-3xl mx-8">{title}</h1>
      <br />
      <br />
      {children}
    </div>
  );
}

export default Template;
