import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import '../styles/Overview.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

function Overview() {
  // eslint-disable-next-line no-unused-vars
  const [metrics] = useState({
    totalShipments: 224520,
    deliveriesInProgress: 21448596.0,
    successfulDeliveries: 19682,
    failedDeliveries: 83,
    averageLeadTime: 3
  });

  const [chartData, setChartData] = useState({
    shipmentVolumeByRegion: {
      labels: ['Delhi', 'Mumbai', 'Bengaluru', 'Hyderabad'],
      datasets: [
        {
          label: 'Shipments',
          data: [4049661.0, 3614821.0, 2827838.0, 1899383.0],
          backgroundColor: 'rgba(75, 192, 192, 0.6)'
        }
      ]
    },
    leadTimeOverTime: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Average Lead Time (days)',
          data: [2.5, 3.1, 3.7, 3.0],
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          fill: true
        }
      ]
    }
  });

  // eslint-disable-next-line no-unused-vars
  const [filters] = useState({
    startDate: '',
    endDate: '',
    status: 'All',
    channels: 'All',
    carriers: 'All',
  });

  // Define fetchMetrics before useEffect
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchMetrics = async () => {
    try {
      const response = await axios.get('/api/overview', { params: filters });
      setChartData(response.data.charts || chartData);
    } catch (error) {
      console.error("Error fetching metrics:", error);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics, filters]);

  return (
    <div className="overview-container">

      <div className="metrics">
        <div className="metric-card">
          <h3>Total Restaurants</h3>
          <p>{metrics.totalShipments}</p>
        </div>
        <div className="metric-card">
          <h3>Total Reviews</h3>
          <p>{metrics.deliveriesInProgress}</p>
        </div>
        <div className="metric-card">
          <h3>Total Cuisine</h3>
          <p>{metrics.successfulDeliveries}</p>
        </div>
        <div className="metric-card">
          <h3>Total Cities</h3>
          <p>{metrics.failedDeliveries}</p>
        </div>
        <div className="metric-card">
          <h3>Total Areas : 2501</h3>
          <p> </p>
        </div>
      </div>

      <div className="charts">
        <div className="chart">
          <h4>Top 4 cities with the highest total orders</h4>
          <Bar data={chartData.shipmentVolumeByRegion} />
        </div>
      </div>
    </div>
  );
}

export default Overview;