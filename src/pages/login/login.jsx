

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        formData
      );

      const message = res.data.message || "Login Successful!";
      toast.success(message);
      

      localStorage.setItem("token", res.data.result.token);
      localStorage.setItem("role", res.data.result.role);

      if (res.data.result.store?._id) {
        localStorage.setItem("storeid", res.data.result.store._id);
      } else {
        localStorage.removeItem("storeid");
      }

      if (res.data.result.role === "admin") {
        if (res.data.result.store && res.data.result.store._id) {
          navigate("/admin/dashboard");
        } else {
          navigate("/admin/admindashboard");
        }
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(135deg, #7f7fd5, #86a8e7, #91eae4)",
      }}
    >
      <div
        className="bg-white p-4 p-sm-5 rounded-4 shadow-sm"
        style={{ width: "100%", maxWidth: "450px" }}
      >
        <h2 className="text-center fw-bold mb-4" style={{ color: "#333" }}>
          Login
        </h2>

        {msg && <div className="alert alert-info mb-4">{msg}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={handleChange}
              required
            />
            <label
                      htmlFor="forget"
                      className="d-flex justify-content-end fw-bold text-primary no-link-style"
                      >
                     
                      <Link to="/forget" className="no-link-style">
                     
                        forget Password ?
                      </Link>
                    </label>
                      </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 mb-3 fw-bold"
            style={{ backgroundColor: "#6c63ff", border: "none" }}
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="text-center">
          <p className="mb-0">
            Not a Member? <a href="/" className="text-decoration-none">Register Now</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
