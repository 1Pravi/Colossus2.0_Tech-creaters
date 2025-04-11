import React from 'react';
import '../../styles/layout styles/topbar.css';

function Topbar({ toggleSidebar }) {
  return (
    <div className="topbar">
      <button className="sidebar-toggle-btn" onClick={toggleSidebar}>☰</button>
      <h1>FIN ANALYSIS</h1>
    </div>
  );
}

export default Topbar;
