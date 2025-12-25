
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../Redux/pageSlice";
import { toast } from "react-toastify";

const RegisterStore = () => {
  const [formData, setFormData] = useState({
    store_name: "",
    store_address: "",
    bank_account_number: "",
    ifsc_code: "",
  });

  const navigate = useNavigate();
  const dispatch= useDispatch();


useEffect(()=>{
  dispatch(setPageTitle("Register Store"))
},[dispatch])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/registerStore`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Store registered successfully!");
      const storeId = res.data.result._id;
      localStorage.setItem("storeid", storeId);
      navigate("/admin/addcategories");
    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="bg-light py-5"
      style={{ minHeight: "100vh" }}
    >
      <div className="container">
        <div className="text-center mb-4">
          {/* <h2 className="fs-3 fw-bold">Register Your Store!</h2> */}
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-6">
            <form onSubmit={handleSubmit}>
              <div className="p-4 p-md-5 shadow-sm rounded bg-white">
                <div className="mb-3">
                  <label htmlFor="store_name" className="form-label fw-semibold">
                    Store Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="store_name"
                    name="store_name"
                    value={formData.store_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="store_address" className="form-label fw-semibold">
                    Store Address
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="store_address"
                    name="store_address"
                    value={formData.store_address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="bank_account_number" className="form-label fw-semibold">
                    Bank Account Number
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="bank_account_number"
                    name="bank_account_number"
                    value={formData.bank_account_number}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="ifsc_code" className="form-label fw-semibold">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="ifsc_code"
                    name="ifsc_code"
                    value={formData.ifsc_code}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 py-2 fs-5 fw-semibold"
                >
                  Create Store
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterStore;

