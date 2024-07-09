import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import loginbg from '../assets/login-bg-1.svg';
import './Dashboard.css';

const Dashboard = () => {
  const [totalProjects, setTotalProjects] = useState(0);
  const [closedProjects, setClosedProjects] = useState(0);
  const [runningProjects, setRunningProjects] = useState(0);
  const [closureDelayProjects, setClosureDelayProjects] = useState(0);
  const [cancelledProjects, setCancelledProjects] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchCounters = async () => {
      try {
        const countersRes = await axios.get('https://techprimebackend-j1hq.onrender.com/api/projects/counters');
      
        setTotalProjects(countersRes.data.totalProjects);
        setClosedProjects(countersRes.data.closedProjects);
        setRunningProjects(countersRes.data.runningProjects);
        setCancelledProjects(countersRes.data.cancelledProjects);
        setClosureDelayProjects(0);

        // Fetch projects for the chart data
        const projectsRes = await axios.get('https://techprimebackend-j1hq.onrender.com/api/projects/getall');
        const projects = projectsRes.data;
        console.log(projectsRes)
        // Compute chart data
        const departments = [...new Set(projects.map(p => p.department))];
        const chartData = departments.map(department => {
          const deptProjects = projects.filter(p => p.department === department);
          const totalDept = deptProjects.length;
          const closedDept = deptProjects.filter(p => p.status === 'Closed').length;
          return { name: department, Total: totalDept, Closed: closedDept };
        });

        setChartData(chartData);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchCounters();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="top-img-d">
          <img src={loginbg} className="top-d" alt="background" />
        </div>
        <div className="dashboard-name">Dashboard</div>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h6>Total Projects</h6>
          <h5>{totalProjects}</h5>
        </div>
        <div className="dashboard-card">
          <h6>Closed</h6>
          <h5>{closedProjects}</h5>
        </div>
        <div className="dashboard-card">
          <h6>Running</h6>
          <h5>{runningProjects}</h5>
        </div>
        <div className="dashboard-card">
          <h6>Closure Delay</h6>
          <h5>{closureDelayProjects}</h5>
        </div>
        <div className="dashboard-card">
          <h6>Cancelled</h6>
          <h5>{cancelledProjects}</h5>
        </div>
      </div>

      <div className="dashboard-chart">
        <h6>Department wise - Total Vs Closed</h6>
        <BarChart width={600} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Total" fill="#8884d8" />
          <Bar dataKey="Closed" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  );
};

export default Dashboard;