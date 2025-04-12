// ForecastingPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ForecastingPage = () => {
  const [cashflowData, setCashflowData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  // Fetch data from APIs
  useEffect(() => {
    // Fetch cashflow forecast data
    axios.get('http://localhost:5000/forecast_cashflow')
      .then(response => setCashflowData(response.data));

    // Fetch expense forecast data
    axios.get('http://localhost:5000/forecast_expense')
      .then(response => setExpenseData(response.data));

    // Fetch revenue forecast data
    axios.get('http://localhost:5000/forecast_revenue')
      .then(response => setRevenueData(response.data));
  }, []);

  // Format data for chart rendering
  const formatDataForChart = (data) => {
    return data.map(item => ({
      date: new Date(item.ds).toLocaleDateString(),
      forecast: item.yhat,
    }));
  };

  return (
    <div className="forecasting-page">
      <h1>Forecasting Overview</h1>

      {/* Cashflow Forecast Chart */}
      <div className="chart-container">
        <h2>Cashflow Forecast</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formatDataForChart(cashflowData)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="forecast" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Expense Forecast Chart */}
      <div className="chart-container">
        <h2>Expense Forecast</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formatDataForChart(expenseData)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="forecast" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue Forecast Chart */}
      <div className="chart-container">
        <h2>Revenue Forecast</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formatDataForChart(revenueData)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="forecast" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ForecastingPage;
