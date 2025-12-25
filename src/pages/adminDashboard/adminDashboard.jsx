
import React from "react";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../Redux/pageSlice";
import { useEffect } from "react";
const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(setPageTitle("Dashboard"))
  },[dispatch])


  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center vh-80"
      style={{ gap: "3rem" }}
    >
   
      <h1 className="fs-3 fw-semibold text-dark mb-4">
        Welcome to Admin's Dashboard
      </h1>

      
      <div
        className="bg-white p-4 p-sm-5 rounded-4 shadow-sm"
        style={{ minWidth: "280px", maxWidth: "500px" }}
      >
        <button
          className="btn btn-primary btn-lg d-flex align-items-center mx-auto px-4 py-2"
          onClick={() => navigate("/admin/registerStore")}
          style={{ gap: "0.5rem" }}
        >
          <FaPlus className="mb-1" style={{ fontSize: "0.875rem" }} />
          Register Your Store
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
