import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; 
import Dashboardlogo from '../assets/Dashboard.svg';
import CreateProject from '../assets/create-project-active.svg';
import Projects from '../assets/Project-list-active.svg';
import Logout from '../assets/Logout.svg';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        <Link className="sidebar-link" to="/dashboard"><img src={Dashboardlogo} alt="Dashboard" /></Link>
        <Link className="sidebar-link" to="/create-project"><img src={CreateProject} alt="Create Project" /></Link>
        <Link className="sidebar-link" to="/ProjectListing"><img src={Projects} alt="Projects"/></Link>
      </nav>
      <Link className="sidebar-link-logout-link" to="/logout"><img src={Logout} alt="Logout"/></Link>
    </div>
  );
};

export default Sidebar;
