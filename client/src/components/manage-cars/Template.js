import React from "react";
import { Link } from "react-router-dom";

function Template({ children }) {
  return (
    <div className="p-4 flex flex-wrap flex-col justify-center space-x-8 rounded-md mt-16">
      <h1 className="text-3xl mx-8">Manage Cars</h1>
      <br />
      <div className="space-x-3">
        <Link
          to="/admin/manage/cars/add"
          className="bg-green-400 rounded-md w-24 hover:shadow-md text-xl text-slate-900 px-3 py-1"
        >
          Add
        </Link>

        <Link
          to="/admin/manage/cars/edit"
          className="bg-blue-400 rounded-md w-48 hover:shadow-md text-xl text-white px-4 py-1"
        >
          Delete / Update
        </Link>
      </div>
      {children}
    </div>
  );
}

export default Template;
