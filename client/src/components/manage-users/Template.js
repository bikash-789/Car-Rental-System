import React from "react";
function Template({ children }) {
  return (
    <div className="p-4 flex flex-wrap flex-col justify-center space-x-8 rounded-md mt-16">
      <h1 className="text-3xl mx-8">Manage Users</h1>
      <br />
      {children}
    </div>
  );
}

export default Template;
