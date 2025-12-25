// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     contact: "",
//     address: "",
//     pincode: "",
//     role: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMsg("");

//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_URL}/user/register`,
//         {
//           name: formData.name,
//           email: formData.email,
//           contact_number: formData.contact,
//           address: formData.address,
//           pincode: formData.pincode,
//           role: formData.role,
//           password: formData.password,
//         }
//       );

//       const message = res.data.message || "User Registered Successfully!";
//       setMsg(message);
//       toast.info(message);
//       toast.success("registration Successfull");
//       navigate("/login");
//     } catch (error) {
//       if (error.response) {
//         setMsg(error.response.data.message || "Registration Failed!");
//         toast.error(error.response.data.message || "Registration Failed!");
//         // toast.error("Registration Unsuccessfull");
//       } else {
//         setMsg("Server not responding!");
//         toast.error("Server not responding!");
//       }
//     }
//     setLoading(false);
//   };

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center vh-100 "
//       style={{
//         background: "linear-gradient(135deg, #7F7FD5, #86A8E7, #91EAE4)",
//       }}
//     >
//       <div
//         className="card shadow p-4 rounded"
//         style={{ width: "100%", maxWidth: "420px" }}
//       >
//         <h2 className="text-center fw-bold">Register</h2>

//         {msg && <div className="alert alert-info">{msg}</div>}

//         <form onSubmit={handleSubmit}>
//           <div className="">
//             <label htmlFor="name" className="form-label fw-semibold">
//               Name
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="name"
//               name="name"
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="">
//             <label htmlFor="email" className="form-label fw-semibold">
//               Email
//             </label>
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               name="email"
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="">
//             <label htmlFor="contact" className="form-label fw-semibold">
//               Contact Number
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="contact"
//               name="contact"
//               maxLength="10"
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="">
//             <label htmlFor="address" className="form-label fw-semibold">
//               Address
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="address"
//               name="address"
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="">
//             <label htmlFor="pincode" className="form-label fw-semibold">
//               Pincode
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="pincode"
//               name="pincode"
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="">
//             <label htmlFor="role" className="form-label fw-semibold">
//               Role
//             </label>
//             <select
//               className="form-select"
//               id="role"
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               required
//             >
//               <option value="">-- Select User Role --</option>
//               <option value="superadmin">Super Admin</option>
//               <option value="admin">Admin</option>
//               <option value="customer">Customer</option>
//             </select>
//           </div>

//           <div className="mb-2">
//             <label htmlFor="password" className="form-label fw-semibold">
//               Password
//             </label>
//             <input
//               type="password"
//               className="form-control"
//               id="password"
//               name="password"
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="btn btn-primary w-100 py-2 fw-bold"
//             disabled={loading}
//           >
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </form>

//         <div className="text-center mt-3">
//           <p>
//             Already a Member? <a href="/login" className="text-primary fw-semibold text-decoration-none">Login</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;


import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Register = () => {
  const navigate = useNavigate();

  
  const initialValues = {
    name: "",
    email: "",
    contact: "",
    address: "",
    pincode: "",
    role: "",
    password: "",
  };

  
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    contact: Yup.string()
      .matches(/^[0-9]{10}$/, "Contact must be 10 digits")
      .required("Contact number is required"),
    address: Yup.string().required("Address is required"),
    pincode: Yup.string()
      .matches(/^[0-9]{6}$/, "Pincode must be 6 digits")
      .required("Pincode is required"),
    role: Yup.string().required("Role is required"),
    password: Yup.string()
      .min(6, "Minimum 8 characters")
      .required("Password is required"),
  });

  
  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/user/register`, {
        name: values.name,
        email: values.email,
        contact_number: values.contact,
        address: values.address,
        pincode: values.pincode,
        role: values.role,
        password: values.password,
      });

      toast.success("Registration Successful");
      navigate("/login");
    } catch (error) {
      const msg =
        error.response?.data?.message || "Server not responding!";
      setStatus(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(135deg, #7F7FD5, #86A8E7, #91EAE4)",
      }}
    >
      <div
        className="card p-4 shadow"
        style={{ maxWidth: "420px", width: "100%", borderRadius: "12px" }}
      >
        <h2 className="text-center fw-bold text-dark">Register</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form>
              {status && (
                <p className="text-center text-danger mb-3">{status}</p>
              )}

         
              <div className="mb-3">
                <label className="form-label fw-semibold">Name</label>
                <Field name="name" className="form-control" />
                <ErrorMessage
                  name="name"
                  component="small"
                  className="text-danger"
                />
              </div>

            
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage
                  name="email"
                  component="small"
                  className="text-danger"
                />
              </div>

              
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Contact Number
                </label>
                <Field
                  name="contact"
                  maxLength="10"
                  className="form-control"
                />
                <ErrorMessage
                  name="contact"
                  component="small"
                  className="text-danger"
                />
              </div>

        
              <div className="mb-3">
                <label className="form-label fw-semibold">Address</label>
                <Field name="address" className="form-control" />
                <ErrorMessage
                  name="address"
                  component="small"
                  className="text-danger"
                />
              </div>

              
              <div className="mb-3">
                <label className="form-label fw-semibold">Pincode</label>
                <Field name="pincode" className="form-control" />
                <ErrorMessage
                  name="pincode"
                  component="small"
                  className="text-danger"
                />
              </div>

              
              <div className="mb-3">
                <label className="form-label fw-semibold">Role</label>
                <Field as="select" name="role" className="form-select">
                  <option value="">-- Select User Role --</option>
                  <option value="superadmin">Super Admin</option>
                  <option value="admin">Admin</option>
                  <option value="customer">Customer</option>
                </Field>
                <ErrorMessage
                  name="role"
                  component="small"
                  className="text-danger"
                />
              </div>

          
              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="form-control"
                />
                <ErrorMessage
                  name="password"
                  component="small"
                  className="text-danger"
                />
              </div>

             
              <button
                type="submit"
                className="btn w-100 mt-3"
                style={{ backgroundColor: "#6C63FF", color: "white" }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    />
                    Loading...
                  </>
                ) : (
                  "Register"
                )}
              </button>
            </Form>
          )}
        </Formik>

        <div className="text-center mt-3">
          <p>
            Already a Member?{" "}
            <Link
              to="/login"
              className="text-decoration-none fw-semibold"
              style={{ color: "#6C63FF" }}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
