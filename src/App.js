// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
// import Sidebar from './Components/SideBar';
// import Login from './Components/Login';
// import Dashboard from './Components/DashBoard';
// import CreateProject from './Components/CreateProject';
// // import Page2 from './Page2';
// // import Page3 from './Page3';

// const theme = createTheme();

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Router>
//         <div style={{ display: 'flex' }}>
//           <Sidebar />
//           <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: 30 }}>
//             <Routes>
              
//               <Route path="/DashBoard" element={<Dashboard />} />
//               <Route path="/" element={<Login />} />
//               <Route path="/CreateProject" element={<CreateProject />} />
//               {/* <Route path="/page1" element={<Page1 />} />
//               <Route path="/page2" element={<Page2 />} />
//               <Route path="/page3" element={<Page3 />} /> */}
//             </Routes>
//           </Box>
//         </div>
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import Sidebar from './Components/SideBar';
import Login from './Components/Login';
import Dashboard from './Components/DashBoard';
import CreateProject from './Components/CreateProject';
import ProjectListing from './Components/ProjectListing';
// import Page2 from './Page2';
// import Page3 from './Page3';

const theme = createTheme();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true); // Update state to indicate logged-in status
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
              
            </Routes>
          </Box>
          {loggedIn && <Sidebar />} {/* Render Sidebar only if logged in */}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
