import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./dashboard.css";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../Redux/pageSlice";
const Dashboard = () => {
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderCount, setOrderCount] = useState();
  const [categoryCount, setCategoryCount] = useState();
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [partners, setPartners] = useState([]);
  const [productCount, setProductCount] = useState();
  const [partnerCount, setPartnerCount] = useState();
  const [newPartner, setNewPartner] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle("Dashboard"));
  }, [dispatch]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    unit: "",
    description: "",
    store: "",
    in_stock: "",
    subscription_available: "",
    expire_date: "",
    subscription_frequency: "",
    image: null,
    max_order_limit: "",
  });
  const emptyProduct = {
    name: "",
    category: "",
    price: "",
    unit: "",
    description: "",
    store: "",
    in_stock: "",
    subscription_available: "",
    expire_date: "",
    subscription_frequency: "",
    image: null,
    max_order_limit: "",
  };
  const token = localStorage.getItem("token");
  const storeid = localStorage.getItem("storeid");

  const handleAddCategory = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/user/registercategory`,
        newCategory,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Category Added Successfully!");
      setNewCategory({ name: "", description: "" });
      fetchCategories();
      const closeBtn = document.getElementById("closeAddModal");
      if (closeBtn) closeBtn.click();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error");
    }
  };
  const getOrders = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/getorders`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setOrders(res.data.result.orders || []);
        setOrderCount(res.data.result.totalOrders || 0);
      }
    } catch (error) {
      console.log("Error fetching orders", error.message);
    }
  };

  const closeAddModal = () => {
    setShowAddProductModal(false);
    setNewProduct(emptyProduct);
  };
  const closeCategoryModal = () => {
    setShowCategoryModal(false);
    setNewCategory({ name: "", description: "" });
  };
  const closePartnerModal = () => {
    setShowPartnerModal(false);
    setNewPartner({ name: "", phone: "", email: "" });
  };
  useEffect(() => {
    fetchCategories();
    getOrders();
    fetchPartners();
    fetchProducts();
  }, []);
  const handleAddPartner = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/user/adddeliverypartner`,
        newPartner,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Delivery Partner Added Successfully!");
      setNewPartner({ name: "", phone: "", email: "" });

      document.getElementById("closeAddPartnerModal")?.click();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error occurred");
    }
  };
  const handleAdd = async () => {
    try {
      const formData = new FormData();
      Object.keys(newProduct).forEach((key) => {
        if (newProduct[key]) formData.append(key, newProduct[key]);
      });
      formData.append("store", storeid);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/user/registerproduct`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Product added successfully!");

      setNewProduct(emptyProduct);
      closeAddModal();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/getAllCategory`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCategories(res.data.result.category || []);
      setCategoryCount(res.data.result.categoryCount || 0);
    } catch (error) {
      console.log("Category Fetch Error:", error);
    }
  };
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/product`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProductCount(res.data.result.total || 0);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPartners = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/getalldeliverypartner`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPartners(res.data.results || []);
      setPartnerCount(res.data.result.partnerCount || 0);
    } catch (error) {
      console.error("Error fetching partners:", error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewProduct({ ...newProduct, image: files[0] });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* <h2 className="fs-3 fw-bold mb-0">Dashboard</h2> */}
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className=" border-0 shadow-sm h-100">
            <div className=" p-3 p-md-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="text-muted mb-1">Total Orders</h5>
                  <h3 className="fw-bold mb-0">{orderCount}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className=" border-0 shadow-sm h-100">
            <div className=" p-3 p-md-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="text-muted mb-1">Total product</h5>
                  <h3 className="fw-bold mb-0">{productCount}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className=" border-0 shadow-sm h-100">
            <div className=" p-3 p-md-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="text-muted mb-1">Total Categories</h5>
                  <h3 className="fw-bold mb-0">{categoryCount}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className=" border-0 shadow-sm h-100">
            <div className=" p-3 p-md-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="text-muted mb-1">Total Delivery Partners</h5>
                  <h3 className="fw-bold mb-0">{partnerCount}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6 col-lg-4">
          <div className=" border-0 shadow-sm h-100">
            <div className=" p-3 p-md-4 d-flex flex-column">
              <h5 className="fw-semibold mb-3">Quick Actions</h5>
              <button
                className="btn btn-outline-primary mb-2"
                onClick={() => setShowAddProductModal(true)}
              >
                <i className="bi bi-plus-circle me-2"></i> Add Product
              </button>
              <button
                className="btn btn-outline-success mb-2"
                onClick={() => setShowCategoryModal(true)}
              >
                <i className="bi bi-tag me-2"></i> Add Category
              </button>
              <button
                className="btn btn-outline-info"
                onClick={() => setShowPartnerModal(true)}
              >
                <i className="bi bi-person-plus me-2"></i> Add Delivery Partner
              </button>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-8">
          <div className=" border-0 shadow-sm h-100">
            <div className=" p-3 p-md-4">
              <h5 className="fw-semibold mb-3">Recent Orders</h5>
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Amount</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center py-3">
                          No orders found
                        </td>
                      </tr>
                    ) : (
                      orders.slice(0, 3).map((order) => (
                        <tr key={order._id}>
                          <td>#{order._id}</td>
                          <td>{order.user.name || "N/A"}</td>
                          <td>₹{order.totalAmount}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showAddProductModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Product</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeAddModal}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Product Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={newProduct.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                   <label htmlFor="name" className="form-label">
                      Category
                    </label>

                  <select
                    className="form-select mb-3"
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, category: e.target.value })
                    }
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      name="price"
                      value={newProduct.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    {/* <label htmlFor="unit" className="form-label">
                      Unit
                    </label> */}
                    {/* <input
                      type="text"
                      className="form-control"
                      id="unit"
                      name="unit"
                      value={newProduct.unit}
                      onChange={handleInputChange}
                      required
                    /> */}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      rows="3"
                      value={newProduct.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  {/* <div className="mb-3">
                    <label htmlFor="in_stock" className="form-label">
                      In Stock
                    </label>
                    <select
                      className="form-select"
                      id="in_stock"
                      name="in_stock"
                      value={newProduct.in_stock}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div> */}
                  {/* <div className="mb-3">
                    <label
                      htmlFor="subscription_available"
                      className="form-label"
                    >
                      Subscription Available
                    </label>
                    <select
                      className="form-select"
                      id="subscription_available"
                      name="subscription_available"
                      value={newProduct.subscription_available}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div> */}
                  <div className="mb-3">
                    <label htmlFor="expire_date" className="form-label">
                      Expire Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="expire_date"
                      name="expire_date"
                      value={newProduct.expire_date}
                      onChange={handleInputChange}
                    />
                  </div>
                  {/* <div className="mb-3">
                    <label
                      htmlFor="subscription_frequency"
                      className="form-label"
                    >
                      Subscription Frequency
                    </label>
                    <select
                      className="form-select"
                      id="subscription_frequency"
                      name="subscription_frequency"
                      value={newProduct.subscription_frequency}
                      onChange={handleInputChange}
                    >
                      <option value="">Select</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div> */}
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                      Product Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      name="image"
                      onChange={handleInputChange}
                    />
                  </div>
                  {/* <div className="mb-3">
                    <label htmlFor="max_order_limit" className="form-label">
                      Max Order Limit
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="max_order_limit"
                      name="max_order_limit"
                      value={newProduct.max_order_limit}
                      onChange={handleInputChange}
                    />
                  </div> */}
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeAddModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAdd}
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showCategoryModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title">Add Category</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeCategoryModal}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Category Name"
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                />
                <textarea
                  className="form-control"
                  placeholder="Description"
                  rows="3"
                  value={newCategory.description}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleAddCategory}>
                  Save
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={closeCategoryModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* {showPartnerModal && (


  <div className="modal fade" id="addPartnerModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content p-3">
            <h3 className="mb-3">Add Delivery Partner</h3>
                      <button
            type="button"
            className="btn-close"
            onClick={closeCategoryModal}
          ></button>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={newPartner.name}
                onChange={(e) =>
                  setNewPartner({ ...newPartner, name: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Phone"
                value={newPartner.phone}
                onChange={(e) =>
                  setNewPartner({ ...newPartner, phone: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={newPartner.email}
                onChange={(e) =>
                  setNewPartner({ ...newPartner, email: e.target.value })
                }
              />
            </div>
            <div className="d-flex justify-content-end gap-2">
              <button
                id="closeAddPartnerModal"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button className="btn btn-primary" onClick={handleAddPartner}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      )} */}
      {showPartnerModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title">Add Delivery Partner</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closePartnerModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={newPartner.name}
                    onChange={(e) =>
                      setNewPartner({ ...newPartner, name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone"
                    value={newPartner.phone}
                    onChange={(e) =>
                      setNewPartner({ ...newPartner, phone: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={newPartner.email}
                    onChange={(e) =>
                      setNewPartner({ ...newPartner, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={closePartnerModal}
                >
                  Close
                </button>
                <button className="btn btn-primary" onClick={handleAddPartner}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
