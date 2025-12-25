import React from "react";
import { MdOutlineSegment } from "react-icons/md";
import { FaRegBell, FaRegMoon } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import { useSelector } from "react-redux";

const Navbar = () => {
  const title = useSelector((state) => state.page.title);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3 px-lg-4 py-3">
        <div className="container-fluid p-0">
          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-light d-lg-none p-2"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#mobileSidebar"
            >
              <MdOutlineSegment className="fs-5" />
            </button>

            <div className="d-none d-lg-block flex-grow-1">
           
              
              <h2 className="page-title">{title}</h2>
            </div>

            <h5 className="d-lg-none m-0 fw-semibold">{title}</h5>
          </div>

          <div className="d-flex align-items-center gap-3">
            <div className="d-none d-lg-flex align-items-center gap-3">


              <div className="dropdown">
                <button
                  className="btn btn-light border dropdown-toggle px-3 py-1"
                  style={{ width: "150px", height: "40px", fontSize: "0.9rem" }}
                  data-bs-toggle="dropdown"
                >
                  Admin
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <span className="dropdown-item-text text-muted small ps-3">
                      admin@gmail.com
                    </span>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <Link className="dropdown-item" to="/logout">
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <button
              className="btn btn-light d-lg-none p-2"
              data-bs-toggle="offcanvas"
              data-bs-target="#mobileOptions"
            >
              <HiOutlineDotsHorizontal className="fs-5" />
            </button>
          </div>
        </div>
      </nav>

      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="mobileSidebar"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Menu</h5>
          <button className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body p-0">
          <Sidebar />
        </div>
      </div>

      <div className="offcanvas offcanvas-end" tabIndex="-1" id="mobileOptions">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Options</h5>
          <button className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body d-flex flex-column gap-3">
          <div className="d-flex justify-content-center gap-3">

          </div>

          <div className="dropdown mt-2">
            <button
              className="btn btn-light border dropdown-toggle w-100 py-2"
              data-bs-toggle="dropdown"
            >
              Admin
            </button>
            <ul className="dropdown-menu w-100">
              <li>
                <span className="dropdown-item-text text-muted small ps-3">
                  admin@gmail.com
                </span>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <Link className="dropdown-item" to="/logout">
                  Sign Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
