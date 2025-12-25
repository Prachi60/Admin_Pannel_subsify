
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { setPageTitle } from "../../Redux/pageSlice";
import { useDispatch } from "react-redux";

const ManageDeliveryPartner = () => {
  const [partners, setPartners] = useState([]);
  const [newPartner, setNewPartner] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [editId, setEditId] = useState("");
  const [editPartner, setEditPartner] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  useEffect(() => {
    fetchPartners();
    dispatch(setPageTitle("Delivery Partner Management"))
  }, [dispatch]);

  const fetchPartners = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/getalldeliverypartner`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPartners(res.data?.result.partners|| []);
     
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/user/adddeliverypartner`,
        newPartner,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Delivery Partner Added Successfully!");
      setNewPartner({ name: "", phone: "", email: "" });
      fetchPartners();
      document.getElementById("closeAddPartnerModal")?.click();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error occurred");
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This delivery partner will be permanently deleted!",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Delete",
      });
      if (result.isConfirmed) {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/user/deletedeliverypartner/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchPartners();
        Swal.fire("Deleted!", "Delivery Partner has been deleted.", "success");
      }
    } catch (error) {
      Swal.fire("Error", "Delete failed", "error");
    }
  };

  const openEditModal = (p) => {
    setEditId(p._id);
    setEditPartner({ name: p.name, phone: p.phone, email: p.email });
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/user/updatedeliverypartner/${editId}`,
        editPartner,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Delivery Partner Updated Successfully!");
      fetchPartners();
      document.getElementById("closeEditPartnerModal")?.click();
    } catch (error) {
      toast.error("Update failed!");
    }
  };

  return (
    <div className="container-fluid py-4">
     
      <div className="d-flex justify-content-end align-items-center mb-4">
       
        <button
          className="btn btn-primary d-flex align-items-center gap-2"
          data-bs-toggle="modal"
          data-bs-target="#addPartnerModal"
        >
          <FaPlus /> Add Delivery Partner
        </button>
      </div>

      
      <div className="table-responsive shadow-sm bg-white rounded-3 p-3">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Sno.</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {partners.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center fw-bold py-3">
                  No Delivery Partners Found
                </td>
              </tr>
            ) : (
              Array.isArray(partners) &&
              partners.map((p, index) => (
                <tr key={p._id}>
                  <td>{index + 1}</td>
                  <td>{p.name}</td>
                  <td>{p.phone}</td>
                  <td>{p.email || "-"}</td>
                  <td>
                    <div className="d-flex gap-2 ">
                      <button
                        className="btn btn-warning  d-flex justify-content-center align-items-center text-center btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#editPartnerModal"
                        onClick={() => openEditModal(p)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-danger d-flex justify-content-center align-items-center text-center btn-sm"
                        onClick={() => handleDelete(p._id)}
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

      
      <div className="modal fade" id="addPartnerModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content p-3">
            <h3 className="mb-3">Add Delivery Partner</h3>
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
              <button className="btn btn-primary" onClick={handleAdd}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

   
      <div className="modal fade" id="editPartnerModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content p-3">
            <h3 className="mb-3">Edit Delivery Partner</h3>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={editPartner.name}
                onChange={(e) =>
                  setEditPartner({ ...editPartner, name: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={editPartner.phone}
                onChange={(e) =>
                  setEditPartner({ ...editPartner, phone: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                value={editPartner.email}
                onChange={(e) =>
                  setEditPartner({ ...editPartner, email: e.target.value })
                }
              />
            </div>
            <div className="d-flex justify-content-end gap-2">
              <button
                id="closeEditPartnerModal"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button className="btn btn-primary" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageDeliveryPartner;
