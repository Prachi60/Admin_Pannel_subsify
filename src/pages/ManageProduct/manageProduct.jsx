import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../Redux/pageSlice";

const ManageProduct = () => {
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
    image: "",
    max_order_limit: "",
  };

  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState(emptyProduct);
  const [editProduct, setEditProduct] = useState(emptyProduct);
  const [editId, setEditId] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [product, setProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const limit =10;
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCategories();
    fetchProducts(page);
    dispatch(setPageTitle("Manage Products"));
  }, [page, dispatch]);

  const fetchProducts = async (pageNumber = page) => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/user/product?page=${pageNumber}&limit=10`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProduct(res.data.result.products);
      setTotalPages(res.data.result.totalPages);
      setPage(res.data.result.page);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/getAllCategory`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // console.log("Result:", res);

      setCategories(res.data.result.category || []);
    } catch (error) {
      console.log("Category Fetch Error:", error);
    }
  };

  const closeAddModal = () => {
    document.getElementById("addModalCloseBtn")?.click();
  };

  const handleAdd = async () => {
    try {
      const storeid = localStorage.getItem("storeid");
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
      fetchProducts(page);
      setNewProduct(emptyProduct);
      closeAddModal();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/user/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.error("Product deleted!");
      fetchProducts(page);
    } catch (error) {
      console.log(error);
      Swal.fire("Failed", "Delete failed", "error");
    }
  };

  const openEditModal = (pro) => {
    setEditId(pro._id);
    setEditProduct({
      name: pro.name,
      category: pro.category?._id,
      price: pro.price,
      unit: pro.unit,
      description: pro.description,
      store: pro.store,
      in_stock: pro.in_stock,
      subscription_available: pro.subscription_available,
      expire_date: pro.expire_date,
      subscription_frequency: pro.subscription_frequency,
      max_order_limit: pro.max_order_limit,
      image: "",
    });
  };

  const closeEditModal = () => {
    document.getElementById("editModalCloseBtn")?.click();
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      const allowedFields = [
        "name",
        "category",
        "price",
        "unit",
        "description",
        "in_stock",
        "subscription_available",
        "expire_date",
        "subscription_frequency",
        "max_order_limit",
        "store",
      ];
      allowedFields.forEach((field) => {
        if (editProduct[field]) formData.append(field, editProduct[field]);
      });
      if (editProduct.image instanceof File) {
        formData.append("image", editProduct.image);
      }
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/user/update/${editId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Product updated!");
      fetchProducts(page);
      closeEditModal();
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-end align-items-center mb-4">
        {/* <h2 className="fs-4">Product Management</h2> */}
        <button
          className="btn btn-primary d-flex align-items-center gap-2"
          data-bs-toggle="modal"
          data-bs-target="#addModal"
        >
          <FaPlus /> Add Product
        </button>
      </div>

      <div className="table-responsive shadow p-3 bg-white rounded">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Sno.</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {!product || product.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center fw-bold py-3">
                  No products found
                </td>
              </tr>
            ) : (
              product.map((pro, index) => (
                <tr key={pro._id}>
                  {/* <td>{index + 1}</td> */}
                 <td>{(page - 1) * limit + index + 1}</td>

                  <td>{pro.name}</td>
                  <td>₹{pro.price}</td>
                  <td>
                    {Array.isArray(pro.image) ? (
                      <img
                        src={`${import.meta.env.VITE_API_URL}${pro.image[0]}`}
                        width="50"
                        height="50"
                        alt="product"
                        className="img-fluid rounded"
                      />
                    ) : (
                      <img
                        src={`${import.meta.env.VITE_API_URL}${pro.image}`}
                        width="50"
                        height="50"
                        alt="product"
                        className="img-fluid rounded"
                      />
                    )}
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm   d-flex justify-content-center align-items-center text-center btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#productViewModal"
                        onClick={() => setSelectedProduct(pro)}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-sm d-flex justify-content-center align-items-center text-center btn-warning"
                        data-bs-toggle="modal"
                        data-bs-target="#editModal"
                        onClick={() => openEditModal(pro)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-sm  d-flex justify-content-center align-items-center text-center  btn-danger"
                        onClick={() =>
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You want to delete this product",
                            showCancelButton: true,
                            confirmButtonColor: "#d33",
                            cancelButtonColor: "#3085d6",
                            confirmButtonText: "Delete",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              handleDelete(pro._id);
                            }
                          })
                        }
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

     
      <div
        className="modal fade"
        id="productViewModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{selectedProduct?.name}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              {selectedProduct && (
                <div className="row">
                  <div className="col-md-4">
                    <img
                      src={`${import.meta.env.VITE_API_URL}${
                        Array.isArray(selectedProduct.image)
                          ? selectedProduct.image[0]
                          : selectedProduct.image
                      }`}
                      className="img-fluid rounded"
                      alt="product"
                    />
                  </div>
                  <div className="col-md-8">
                    <p>
                      <strong>Category:</strong>{" "}
                      {selectedProduct.category?.name ||
                        selectedProduct.category}
                    </p>
                    {/* <p>
                      <strong>Unit:</strong> {selectedProduct.unit}
                    </p> */}
                    <p>
                      <strong>Description:</strong>{" "}
                      {selectedProduct.description}
                    </p>
                    <p>
                      <strong>Store:</strong>{" "}
                      {Array.isArray(selectedProduct.store)
                        ? selectedProduct.store.join(", ")
                        : selectedProduct.store}
                    </p>
                    {/* <p>
                      <strong>In Stock:</strong>{" "}
                      {selectedProduct.in_stock ? "Yes" : "No"}
                    </p>
                    <p>
                      <strong>Subscription Available:</strong>{" "}
                      {selectedProduct.subscription_available ? "Yes" : "No"}
                    </p> */}
                    <p>
                      <strong>Expire Date:</strong>{" "}
                      {selectedProduct.expire_date}
                    </p>
                    {/* <p>
                      <strong>Subscription Frequency:</strong>{" "}
                      {selectedProduct.subscription_frequency}
                    </p>
                    <p>
                      <strong>Max Order Limit:</strong>{" "}
                      {selectedProduct.max_order_limit}
                    </p> */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="addModal" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content p-4">
            <h2 className="modal-title">Add Product</h2>
            <div className="modal-body">
              <input
                className="form-control mb-3"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
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
              <input
                className="form-control mb-3"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
              {/* <input
                className="form-control mb-3"
                placeholder="Unit (e.g. Kg, Ltr)"
                value={newProduct.unit}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, unit: e.target.value })
                }
              /> */}
              <textarea
                className="form-control mb-3"
                placeholder="Description"
                rows="3"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    description: e.target.value,
                  })
                }
              />
            
              
              <label className="form-label">Expire Date</label>
              <input
                type="date"
                className="form-control mb-3"
                value={newProduct.expire_date}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    expire_date: e.target.value,
                  })
                }
              />
              
              <input
                type="file"
                className="form-control mb-3"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.files[0] })
                }
              />
             
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={handleAdd}>
                Save Product
              </button>
              <button
                className="btn btn-secondary"
                id="addModalCloseBtn"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="editModal" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content p-4">
            <h2 className="modal-title">Edit Product</h2>
            <div className="modal-body">
              <input
                className="form-control mb-3"
                value={editProduct.name}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, name: e.target.value })
                }
              />
              <select
                className="form-select mb-3"
                value={editProduct.category}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, category: e.target.value })
                }
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <input
                className="form-control mb-3"
                value={editProduct.price}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, price: e.target.value })
                }
              />
              <input
                className="form-control mb-3"
                value={editProduct.unit}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, unit: e.target.value })
                }
              />
              <textarea
                className="form-control mb-3"
                value={editProduct.description}
                rows="3"
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    description: e.target.value,
                  })
                }
              />
              <input
                className="form-control mb-3"
                value={editProduct.in_stock}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, in_stock: e.target.value })
                }
              />
              <input
                className="form-control mb-3"
                value={editProduct.subscription_available}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    subscription_available: e.target.value,
                  })
                }
              />
              <label className="form-label">Expire Date</label>
              <input
                type="date"
                className="form-control mb-3"
                value={editProduct.expire_date}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    expire_date: e.target.value,
                  })
                }
              />
              <select
                className="form-select mb-3"
                value={editProduct.subscription_frequency}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    subscription_frequency: e.target.value,
                  })
                }
              >
                <option value="daily">Daily</option>
                <option value="alternate_day">Alternate Day</option>
                <option value="weekend_only">Weekend Only</option>
                <option value="weekly">Weekly</option>
              </select>
              <input
                type="file"
                className="form-control mb-3"
                onChange={(e) =>
                  setEditProduct({ ...editProduct, image: e.target.files[0] })
                }
              />
              <input
                className="form-control mb-3"
                value={editProduct.max_order_limit}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    max_order_limit: e.target.value,
                  })
                }
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={handleUpdate}>
                Update Product
              </button>
              <button
                className="btn btn-secondary"
                id="editModalCloseBtn"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center my-4 gap-2">
        <button
          className="btn btn-outline-secondary"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`btn ${
              page === i + 1 ? "btn-primary" : "btn-outline-secondary"
            }`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="btn btn-outline-secondary"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageProduct;
