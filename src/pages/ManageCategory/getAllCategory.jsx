import React from 'react'
import axios from "axios"
import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../Redux/pageSlice';

const getAllCategory = () => {
     const [categories, setCategories] = useState([]);

 const token = localStorage.getItem("token")
 const dispatch =useDispatch();

     useEffect(() => {
         fetchCategories();
         dispatch(setPageTitle("All Categories"))
       }, [dispatch]);
       const fetchCategories = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/getAllCategory`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCategories(res.data.result.category||[]);
   
      
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
        <div className="table-responsive shadow p-3 bg-white rounded">
       
        <table className="table  table-hover">
          <thead className="table-dark">
            <tr>
              <th>Sno.</th>
              <th>Category Name</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody className="light-table-body">
            {!categories||categories.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center fw-bold py-3">
                  No categories found
                </td>
              </tr>
            ) : (
              categories.map((cat, index) => (
                <tr key={cat._id}>
                  <td>{index + 1}</td>
                  <td>{cat.name}</td>
                  <td>{cat.description}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default getAllCategory