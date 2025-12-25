import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/forget`,
        { email }
      );

      const successMsg =
        res.data?.message || "Password reset link sent to your email";
      toast.success(successMsg);
     
      setEmail("");
      navigate("/resetpassword")
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Something went wrong!";
      toast.error(errorMsg);
     
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-primary vh-100 d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-6 col-sm-8">
            <div className="card shadow-lg border-0 rounded-lg">
              <div className="card-header bg-white text-center py-4">
                <h2 className="fw-bold mb-0">Forgot Password</h2>
              </div>

              <div className="card-body p-4 p-md-5">
              
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <label htmlFor="email">Registered Email</label>
                    </div>
                  </div>

                  <div className="d-grid gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Sending...
                        </>
                      ) : (
                        "Send OTP"
                      )}
                    </button>
                  </div>
                </form>

                <div className="text-center mt-3">
                  <Link
                    to="/login"
                    className="fw-bold text-decoration-none"
                  >
                    Back to Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
