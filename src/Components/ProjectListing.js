import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination } from '@mui/material'; // Import Pagination from Material-UI
import loginbg from '../assets/login-bg-1.svg';
import './ProjectListing.css';
import logo from '../assets/Logo.svg';

const ProjectListing = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('Priority');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Show 7 items per page

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/projects/getall');
        setProjects(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchProjects();
  }, []);

  const updateStatus = async (projectId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        'http://localhost:5000/api/projects/updateStatus',
        { projectId, status: newStatus },
        {
          headers: {
            'x-auth-token': token
          }
        }
      );
      setProjects(projects.map(project => project._id === projectId ? res.data : project));
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredProjects = projects.filter(project =>
    project.projectTheme.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProjects = filteredProjects.sort((a, b) => {
    if (sortKey === 'Priority') {
      const priorityOrder = { Low: 1, Medium: 2, High: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return a[sortKey.toLowerCase()] > b[sortKey.toLowerCase()] ? 1 : -1;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProjects.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <div className="project-header">
        <div className="top-img-project">
          <img src={loginbg} className="top-project" alt="background" />
        </div>
        <div className="project-name">
          <h3>Project Listing</h3>
          <img src={logo} alt="Logo" className="login-logo-create" />
        </div>
      </div>
      <div className="project-listing-content">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div>
            Sort by:
            <select
              className="sort-dropdown"
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
            >
              <option value="Priority">Priority</option>
              <option value="Status">Status</option>
              <option value="Project Name">Project Name</option>
            </select>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Reason</th>
              <th>Division</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Department</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((project) => (
              <tr key={project._id} className="project-card">
                <td>
                  <div className="project-info">
                    <div>{project.projectTheme}</div>
                    <div className="project-dates">{formatDate(project.startDate)} to {formatDate(project.endDate)}</div>
                  </div>
                </td>
                <td>{project.reason}</td>
                <td>{project.division}</td>
                <td>{project.category}</td>
                <td>{project.priority}</td>
                <td>{project.department}</td>
                <td>{project.location}</td>
                <td>{project.status}</td>
                <td className="project-actions">
                  <button
                    className="action-btn start-btn"
                    onClick={() => updateStatus(project._id, 'Running')}
                  >
                    Start
                  </button>
                  <button
                    className="action-btn close-btn"
                    onClick={() => updateStatus(project._id, 'Closed')}
                  >
                    Close
                  </button>
                  <button
                    className="action-btn cancel-btn"
                    onClick={() => updateStatus(project._id, 'Cancelled')}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          count={Math.ceil(sortedProjects.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </>
  );
};

export default ProjectListing;
