import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../Redux/pageSlice";

const getAllProduct = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);


  const token = localStorage.getItem("token");
  const LIMIT = 10;
const dispatch =useDispatch();
  useEffect(() => {
    fetchProducts(page);
    dispatch(setPageTitle("All products"))
  }, [page,dispatch]);
  const fetchProducts = async (pageNumber) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/product?page=${pageNumber}&limit=${LIMIT}`, {
        headers: { Authorization: `Bearer ${token}` },
      });


      
      setProducts(res.data.result.products || []);
      setTotalPages(res.data.result.totalPages || 1);
      setPage(res.data.result.page || 1);


    } catch (error) {
      console.log(error);
    }
  };
 

  return (
    <div>
      <div className="table-responsive shadow p-3 bg-white rounded">

        <table className="table table-hover">
         
          <thead className="table-dark">
  <tr>
    <th>Sno.</th>
    <th>Product Name</th>
    <th>Price</th>
    <th>Image</th>
    <th>Action</th>
  </tr>
</thead>
  <tbody className="light-table-body">
  {!products || products.length === 0 ? (
    <tr>
      <td colSpan="5" className="text-center fw-bold py-3">
        No products found
      </td>
    </tr>
  ) : (
    products.map((pro, index) => (
      <tr key={pro._id}>
        <td>{index + 1}</td>
        <td>{pro.name}</td>
        <td>₹{pro.price}</td>

        <td>
          {Array.isArray(pro.image) ? (
            <img
              src={`${import.meta.env.VITE_API_URL}${pro.image[0]}`}
              width="50"
              height="50"
              alt="product"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <img
              src={`${import.meta.env.VITE_API_URL}${pro.image}`}
              width="50"
              height="50"
              alt="product"
              style={{ objectFit: "cover" }}
            />
          )}
        </td>

        <td>
          <button
            className="btn btn-sm btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#productViewModal"
            onClick={() => setSelectedProduct(pro)}
          >
            View
          </button>
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
        <h5 className="modal-title">
          {selectedProduct?.name}
        </h5>
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
              <p><strong>Category:</strong> {selectedProduct.category?.name || selectedProduct.category}</p>
              <p><strong>Unit:</strong> {selectedProduct.unit}</p>
              <p><strong>Description:</strong> {selectedProduct.description}</p>
              <p><strong>Store:</strong> {Array.isArray(selectedProduct.store) ? selectedProduct.store.join(", ") : selectedProduct.store}</p>
              <p><strong>In Stock:</strong> {selectedProduct.in_stock ? "Yes" : "No"}</p>
              <p><strong>Subscription Available:</strong> {selectedProduct.subscription_available ? "Yes" : "No"}</p>
              <p><strong>Expire Date:</strong> {selectedProduct.expire_date}</p>
              <p><strong>Subscription Frequency:</strong> {selectedProduct.subscription_frequency}</p>
              <p><strong>Max Order Limit:</strong> {selectedProduct.max_order_limit}</p>
            </div>
          </div>
        )}
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

export default getAllProduct;
