import React from "react";
import Register from "./pages/Register/register";
import Login from "./pages/login/login";
import { Routes, Route } from "react-router-dom";
import Admin from "./pages/adminDashboard/adminDashboard";
import AdminLayout from "./Layout/adminLayout";
import RegisterStore from "./pages/RegisterStore/registerStore";
import Dashboard from "./pages/Dashboard";
import "./App.css"
import Manage from "./pages/ManageCategory/manageCategory";
import GetAllCategory from "./pages/ManageCategory/getAllCategory";
import ProductList from "./pages/ManageProduct/productList";
import ManageProduct from "./pages/ManageProduct/manageProduct";
import ManageCategory from "./pages/ManageCategory/manageCategory";
import PrivateRoute from "./Route/PrivateRoute";
import Logout from "./pages/Logout/Logout";
import { ToastContainer } from "react-toastify";
import DeliveryPartner from "./pages/order/deliveryPartner";
import Order from "./pages/order/allOrder";
import ManageDelivery from "./pages/Deliverypartner/managedeliverypartner";
import Pagenotfound from "./pagenotfound";
import ForgetPassword from "./pages/forgetpass/forgetPassword";
import ResetPassword from "./pages/ResetPass/ResetPassword";
const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Pagenotfound/>}/>
        <Route path="/forget" element={<ForgetPassword/>}/>
        <Route path="/resetpassword" element={<ResetPassword/>}/>

        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="admindashboard" element={<Admin />} />
            <Route path="registerstore" element={<RegisterStore />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="addcategories" element={<ManageCategory />} />
            <Route path="managecategory" element={<Manage />} />
            <Route path="getcategory" element={<GetAllCategory />} />
            <Route path="productlist" element={<ProductList />} />
            <Route path="manageproduct" element={<ManageProduct />} />
            <Route path="order" element={<Order />} />
            <Route path="deliverypartner" element={<DeliveryPartner />} />
            <Route path="managedeliverypartner" element={<ManageDelivery />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
