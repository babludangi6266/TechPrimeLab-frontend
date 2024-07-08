
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import Sidebar from './Components/SideBar';
import Login from './Components/Login';
import  Logout from './Components/Logout';
import Dashboard from './Components/DashBoard';
import CreateProject from './Components/CreateProject';
import ProjectListing from './Components/ProjectListing';


const theme = createTheme();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true); 
  };
  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ display: 'flex' }}>
          <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: loggedIn ? 30 : 0 }}>
            <Routes>
              {!loggedIn && <Route path="/" element={<Login onLogin={handleLogin} />} />}
              <Route path="/dashboard" element={loggedIn ? <Dashboard /> : <Navigate to="/" />} />
              <Route path="/create-project" element={loggedIn ? <CreateProject /> : <Navigate to="/" />} />
              <Route path="/ProjectListing" element={loggedIn ? <ProjectListing /> : <Navigate to="/" />} />
              <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
            </Routes>
          </Box>
          {loggedIn && <Sidebar />} {/* Render Sidebar only if logged in */}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
