import React, { useState } from 'react';
import axios from 'axios';
import loginbg from '../assets/login-bg-1.svg';
import './CreateProject.css';
import logo from '../assets/Logo.svg';
const CreateProject = () => {
  const [projectTheme, setProjectTheme] = useState('');
  const [reason, setReason] = useState('For Business');
  const [type, setType] = useState('Internal');
  const [category, setCategory] = useState('Quality A');
  const [priority, setPriority] = useState('High');
  const [division, setDivision] = useState('Filters');
  const [department, setDepartment] = useState('Strategy');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('Pune');
  const [status, setStatus] = useState('Registered');

  const handleSaveProject = async () => {
    const projectData = {
      projectTheme,
      reason,
      type,
      category,
      priority,
      division,
      department,
      startDate,
      endDate,
      location,
      status
    };

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/projects', projectData, {
        headers: {
          'x-auth-token': token
        }
      });
      console.log('Project saved:', res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="create-project-container">
      <div className="create-project-header">
        <div className="top-img-create">
          <img src={loginbg} className="top-create" alt="background" />
        </div>
      
        <div className="create-project-name"><h3>Create Project</h3>
        <img src={logo} alt="Logo" className="login-logo-create" />
        </div>
      </div>
      <div className='create-project-content-div'>
      <div className='form-create-project-theme'>
        <div className="form-group-theme">
          <label htmlFor="projectTheme"></label>
          <input
            type="text"
            placeholder='Enter Project Theme'
            id="projectTheme"
            value={projectTheme}
            onChange={(e) => setProjectTheme(e.target.value)}
          />
        </div>
        <button onClick={handleSaveProject}>Save Project</button>
      </div>
      <div className="form-group-container">
        <div className="form-group">
          <label htmlFor="reason">Reason</label>
          <select
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            <option value="For Business">For Business</option>
            <option value="For Personal">For Personal</option>
            <option value="For Transport">For Transport</option>
            <option value="For Dealership">For Dealership</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Internal">Internal</option>
            <option value="External">External</option>
            <option value="Vendor">Vendor</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Quality A">Quality A</option>
            <option value="Quality B">Quality B</option>
            <option value="Quality C">Quality C</option>
            <option value="Quality D">Quality D</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="division">Division</label>
          <select
            id="division"
            value={division}
            onChange={(e) => setDivision(e.target.value)}
          >
            <option value="Filters">Filters</option>
            <option value="Compressor">Compressor</option>
            <option value="Pumps">Pumps</option>
            <option value="Glass">Glass</option>
            <option value="Water Heater">Water Heater</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="department">Department</label>
          <select
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="Strategy">Strategy</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Finance">Finance</option>
            <option value="Quality">Quality</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Start Date as per Project Plan</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date as per Project Plan</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <select
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="Pune">Pune</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Nashik">Nashik</option>
            <option value="Aurangabad">Aurangabad</option>
          </select>
        </div>
      </div>
      <div className='status-div'>
        <h3>Status:<b>{status}</b></h3>
      </div>
    </div>
    </div>
  );
};

export default CreateProject;
