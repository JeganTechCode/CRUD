// Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Dashboard.css'; // Import the CSS file for styling
import configuration from '../config/config';

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(1); // Number of items per page
  const [data, setData] = useState([]);

  // Fetch data using Axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${configuration.localhostBackend}/api/v1/userDetails`); // Replace with your actual API endpoint
        console.log("response---", response.data.data)
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h2>Welcome to the Dashboard</h2>

        <table className="dashboard-table">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => {
              const dateObject = new Date(item.updatedAt);

              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
                  <td>
                    {/* Split the date into parts */}
                    <div>{dateObject.getFullYear()}-{dateObject.getMonth() + 1}-{dateObject.getDate()}</div>
                    
                    {/* <div>Hours: {dateObject.getHours()}</div>
                    <div>Minutes: {dateObject.getMinutes()}</div>
                    <div>Seconds: {dateObject.getSeconds()}</div> */}
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>

        <div className="pagination">
          {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
            <button
              key={index}
              className={`page-number ${index + 1 === currentPage ? 'active' : ''}`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
