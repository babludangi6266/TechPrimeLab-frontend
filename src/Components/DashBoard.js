// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
// import loginbg from '../assets/login-bg-1.svg';
// import './Dashboard.css'; 

// const data = [
//   { name: 'STR', Total: 19, Closed: 14 },
//   { name: 'FIN', Total: 7, Closed: 6 },
//   { name: 'QLT', Total: 9, Closed: 8 },
//   { name: 'MAN', Total: 15, Closed: 15 },
//   { name: 'STO', Total: 5, Closed: 5 },
//   { name: 'HR', Total: 10, Closed: 9 },
// ];

// const Dashboard = () => {
//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-header">
//         <div className="top-img">
//           <img src={loginbg} className="top" alt="background" />
//         </div>
//         <div className="dashboard-name">Dashboard</div>
//       </div>

//       <div className="dashboard-cards">
//         <div className="dashboard-card">
//           <h6>Total Projects</h6>
//           <h4>8</h4>
//         </div>
//         <div className="dashboard-card">
//           <h6>Closed</h6>
//           <h4>2</h4>
//         </div>
//         <div className="dashboard-card">
//           <h6>Running</h6>
//           <h4>3</h4>
//         </div>
//         <div className="dashboard-card">
//           <h6>Closure Delay</h6>
//           <h4>2</h4>
//         </div>
//         <div className="dashboard-card">
//           <h6>Cancelled</h6>
//           <h4>3</h4>
//         </div>
//       </div>

//       <div className="dashboard-chart">
//         <h6>Department wise - Total Vs Closed</h6>
//         <BarChart width={600} height={300} data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="Total" fill="#8884d8" />
//           <Bar dataKey="Closed" fill="#82ca9d" />
//         </BarChart>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import loginbg from '../assets/login-bg-1.svg';
import './Dashboard.css';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [closedProjects, setClosedProjects] = useState(0);
  const [runningProjects, setRunningProjects] = useState(0);
  const [closureDelayProjects, setClosureDelayProjects] = useState(0);
  const [cancelledProjects, setCancelledProjects] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/projects/getall');
        const projects = res.data;
        setProjects(projects);

        // Compute counts
        const total = projects.length;
        const closed = projects.filter(p => p.status === 'Closed').length;
        const running = projects.filter(p => p.status === 'Running').length;
        const closureDelay = projects.filter(p => new Date(p.endDate) < new Date() && p.status !== 'Closed').length;
        const cancelled = projects.filter(p => p.status === 'Cancelled').length;

        setTotalProjects(total);
        setClosedProjects(closed);
        setRunningProjects(running);
        setClosureDelayProjects(closureDelay);
        setCancelledProjects(cancelled);

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

    fetchProjects();
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
