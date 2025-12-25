import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../Redux/pageSlice";

const AssignedOrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();

  const fetchAssignedOrders = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/getassigned`);
      setOrders(res.data.results); 
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  useEffect(() => {
    fetchAssignedOrders();
    dispatch(setPageTitle("Asssigned Orders"))
  }, [dispatch]);

  return (
    <div className="container mt-4">
      {/* <h2 className="mb-3">Assigned Orders</h2> */}

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Order ID</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Delivery Partner</th>
            <th>Partner Phone</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No assigned orders found
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>₹{order.totalAmount}</td>
                <td>{order.status}</td>
                <td>
                  {order.deliveryPartner
                    ? order.deliveryPartner.name
                    : "Not Assigned"}
                </td>
                <td>
                  {order.deliveryPartner
                    ? order.deliveryPartner.phone
                    : "N/A"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AssignedOrdersTable;
