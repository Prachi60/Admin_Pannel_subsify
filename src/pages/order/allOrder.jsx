import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import { GoEye } from "react-icons/go";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../Redux/pageSlice";
import { toast } from "react-toastify";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [partners, setPartners] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);

  const token = localStorage.getItem("token");
  const dispatch = useDispatch();


  useEffect(()=>{
    dispatch(setPageTitle("All Orders"))

  },[dispatch])

  const getOrders = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/getorders`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setOrders(res.data.result.orders || []);
      }
    } catch (error) {
      console.log("Error fetching orders", error.message);
    }
  };


  const fetchPartners = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/getalldeliverypartner`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPartners(res.data.result.partners || []);
      // console.log("partners",res.data.result.partners);
      
    } catch (error) {
      console.error("Error fetching partners:", error.message);
    }
  };

  const assignPartner = async (orderId) => {
    try {
      if (!selectedPartner) {
        toast.info("Please select a partner");
        return;
      }

      await axios.post(
        `${import.meta.env.VITE_API_URL}/user/assignpartner/${orderId}`,
        { partnerId: selectedPartner },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Partner assigned successfully");
      getOrders();
      setShowModal(false);
      setSelectedPartner("");
    } catch (error) {
      console.log("Error assigning partner:", error.message);
    }
  };

  useEffect(() => {
    getOrders();
    fetchPartners();
  }, []);

  return (
    <div className="container mt-4">
      {/* <h3 className="mb-4">All Orders</h3> */}

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Total (₹)</th>
              <th>Payment Mode</th>
              <th>Subscription</th>
              <th>Status</th>
              <th>Items</th>
              <th>Assign Partner</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>
                  {order.user?.name} <br />
                  <small>({order.user?.email})</small>
                </td>
                <td>{order.totalAmount}</td>
                <td>{order.paymentMode}</td>
                {/* <td>{order.subscription}</td> */}
                <td>
  {order.subscription ? (
    <span className="badge  text-dark">
      {order.subscription.SubscriptionType}
    </span>
  ) : (
    <span className="text-muted">No</span>
  )}
</td>

                <td>{order.orderStatus}</td>

                
                <td>
  <button
    className="btn "
    data-bs-toggle="modal"
    data-bs-target={`#orderModal-${order._id}`}
  >
    <GoEye />
  </button>

 
  <div
    className="modal fade"
    id={`orderModal-${order._id}`}
    tabIndex="-1"
  >
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h6 className="modal-title">Order Details</h6>
          
         
        </div>

      
 <div className="modal-body">
 
  <div className="mb-3 p-3 border rounded bg-light">
    <h6 className="mb-2">Subscription Details</h6>

    {order.subscription ? (
      <div className="row">
        <div className="col-md-6">
          <p className="mb-1">
            <strong>Type:</strong> {order.subscription.SubscriptionType}
          </p>
          <p className="mb-1">
            <strong>Duration:</strong> {order.subscription.duration}
          </p>
          <p className="mb-1">
            <strong>Shift:</strong> {order.subscription.shiftTime}
          </p>
          <p className="mb-1">
            <strong>Status:</strong>{" "}
            {order.subscription.isActive ? (
              <span className="badge bg-success">Active</span>
            ) : (
              <span className="badge bg-danger">Inactive</span>
            )}
          </p>
        </div>

        <div className="col-md-6">
          <p className="mb-1">
            <strong>Start Date:</strong>{" "}
            {new Date(order.subscription.startDate).toLocaleDateString()}
          </p>
          <p className="mb-1">
            <strong>End Date:</strong>{" "}
            {new Date(order.subscription.endDate).toLocaleDateString()}
          </p>
          <p className="mb-1">
            <strong>Next Delivery:</strong>{" "}
            {new Date(order.subscription.nextDeliveryDate).toLocaleDateString()}
          </p>
          <p className="mb-1">
            <strong>Discount:</strong>{" "}
            {order.subscription.discountpercent}%
          </p>
          <p className="mb-1">
            <strong>Platform Fee:</strong> ₹{order.subscription.platformfee}
          </p>
        </div>
      </div>
    ) : (
      <p className="text-muted mb-0">No subscription applied</p>
    )}
  </div>

  <table className="table table-sm table-bordered mb-0">
    <thead>
      <tr>
        <th>Product</th>
        <th>Price</th>
        <th>Qty</th>
      </tr>
    </thead>
    <tbody>
      {order.items?.map((item) => (
        <tr key={item._id}>
          <td>{item.product?.name}</td>
          <td>₹{item.price}</td>
          <td>{item.quantity}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>



      </div>
    </div>
  </div>
</td>


                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      setCurrentOrderId(order._id);
                      setShowModal(true);
                    }}
                  >
                    <FaPlus /> Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title">Assign Delivery Partner</h5>
              </div>

              <div className="modal-body">
                <label>Select Delivery Partner:</label>
                <select
                  className="form-select mt-2"
                  value={selectedPartner}
                  onChange={(e) => setSelectedPartner(e.target.value)}
                >
                  <option value="">Choose Partner</option>
                  {partners.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name} ({p.phone})
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-success"
                  onClick={() => assignPartner(currentOrderId)}
                >
                  Assign
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllOrders;
