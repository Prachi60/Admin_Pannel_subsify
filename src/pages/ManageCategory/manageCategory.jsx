
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { setPageTitle } from "../../Redux/pageSlice";
import { useDispatch } from "react-redux";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });
  const [editId, setEditId] = useState("");
  const [editCategory, setEditCategory] = useState({
    name: "",
    description: "",
  });

  const token = localStorage.getItem("token");
  const storeid = localStorage.getItem("storeid");
  const dispatch = useDispatch();

  useEffect(() => {
    if (storeid) {
      fetchCategories();
      dispatch(setPageTitle("Manage Categories"))
    }
  }, [storeid,dispatch]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/getAllCategory`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCategories(res.data.result.category|| []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async () => {
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

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This category will be permanently deleted!",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Delete",
      });
      if (result.isConfirmed) {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/user/deletecategory/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchCategories();
        Swal.fire({
          title: "Deleted!",
          text: "Category has been deleted successfully.",
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Delete failed", "error");
    }
  };

  const openEditModal = (cat) => {
    setEditId(cat._id);
    setEditCategory({ name: cat.name, description: cat.description });
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/user/updatecategory/${editId}`,
        editCategory,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Category Updated Successfully!");
      fetchCategories();
      const closeBtn = document.getElementById("closeEditModal");
      if (closeBtn) closeBtn.click();
    } catch (error) {
      console.log(error);
      toast.error("Update failed!");
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-end align-items-center mb-4">
       
        <button
          className="btn btn-primary d-flex align-items-center gap-2"
          data-bs-toggle="modal"
          data-bs-target="#addModal"
        >
          <FaPlus /> Add Category
        </button>
      </div>

      <div className="table-responsive shadow p-3 bg-white rounded">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Sno.</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center fw-bold py-3">
                  No categories found
                </td>
              </tr>
            ) : (
              categories.map((cat, index) => (
                <tr key={cat._id}>
                  <td>{index + 1}</td>
                  <td>{cat.name}</td>
                  <td>{cat.description}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn  d-flex justify-content-center align-items-center text-center btn-warning btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#editModal"
                        onClick={() => openEditModal(cat)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn d-flex justify-content-center align-items-center text-center btn-danger btn-sm"
                        onClick={() => handleDelete(cat._id)}
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

     
      <div className="modal fade" id="addModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content p-3">
            <h3 className="modal-title">Add Category</h3>
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
              <button className="btn btn-primary" onClick={handleAdd}>
                Save
              </button>
              <button
                id="closeAddModal"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="editModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content p-3">
            <h3 className="modal-title">Edit Category</h3>
            <div className="modal-body">
              <input
                type="text"
                className="form-control mb-3"
                value={editCategory.name}
                onChange={(e) =>
                  setEditCategory({ ...editCategory, name: e.target.value })
                }
              />
              <textarea
                className="form-control"
                rows="3"
                value={editCategory.description}
                onChange={(e) =>
                  setEditCategory({
                    ...editCategory,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={handleUpdate}>
                Update
              </button>
              <button
                id="closeEditModal"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCategory;
