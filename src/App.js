import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './components/layout components/Sidebar';
import Topbar from './components/layout components/topbar';
import SearchBox from './components/layout components/SearchBox';
import RestaurantInsights from './components/Restaurant Insights';
import CustomerPreferences from './components/Customer Preferences';
import LocationBasedAnalysis from './components/Location Based Analysis';
import Overview from './components/Overview';
import Operationp from './components/DeliveryPerformance';
import AiInsightsPage from './components/AiInsightsPage';
import ChatBot from  './components/DeliveryPerformance'

import './styles/layout styles/App.css';
import FinancialForecast from "./components/FinancialForecast";

function AppLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const hideLayout = location.pathname === "/ai-insights";

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="App">
      {!hideLayout && <Sidebar isOpen={sidebarOpen} />}
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {!hideLayout && <Topbar toggleSidebar={toggleSidebar} />}
        <div className="se">
          {!hideLayout && <SearchBox />}
          <div className="content">
            <Routes>
              <Route path="/" element={<RestaurantInsights />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/consumption" element={<CustomerPreferences />} />
              <Route path="/vendors" element={<LocationBasedAnalysis />} />
              <Route path="/DeliveryPerformance" element={<ChatBot />} />
              <Route path="/Data" element={<FinancialForecast />} />
              <Route path="/ai-insights" element={<AiInsightsPage />} />
              <Route path="/chatBot" element={<ChatBot />} />

            </Routes>
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
