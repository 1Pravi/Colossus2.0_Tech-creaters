import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './Components/layout compontents/Sidebar';
import Topbar from './Components/layout compontents/topbar';
import SearchBox from './Components/layout compontents/SearchBox';
import './styles/layout styles/App.css';

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="App">
      <Sidebar isOpen={sidebarOpen} />
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Topbar toggleSidebar={toggleSidebar} />
        <div className="se">
          <SearchBox />
          <div className="content">
            {/* Put static content or components here */}
            <h2>Welcome to the Dashboard</h2>
            {/* You can replace the line above with any default static component */}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
