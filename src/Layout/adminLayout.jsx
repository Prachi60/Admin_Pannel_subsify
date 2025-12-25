import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";


const AdminLayout = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2 p-0 position-fixed sidebar-wrapper">
          <Sidebar />
        </div>

        <div className="col-lg-10 p-0 offset-lg-2 p-0 main-content">
          <Navbar />

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
