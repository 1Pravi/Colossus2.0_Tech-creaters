import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/layout styles/Sidebar.css';

function Sidebar({ isOpen }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <ul>
        <li>
          <NavLink to="/overview" className={({ isActive }) => isActive ? 'active' : ''}>Overview</NavLink>
        </li>
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Realtime cashflow</NavLink>
        </li>
        <li>
          <NavLink to="/consumption" className={({ isActive }) => isActive ? 'active' : ''}>Revenue Expense Analysis</NavLink>
        </li>
        <li>
          <NavLink to="/vendors" className={({ isActive }) => isActive ? 'active' : ''}>Profit and loss</NavLink>
        </li>
        <li>
          <NavLink to="/Data" className={({ isActive }) => isActive ? 'active' : ''}>Financial forecast</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;


