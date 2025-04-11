import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  LineChart, Line, Legend
} from "recharts";
import '../styles/Location Based Analysis.css';

const metrics = [
  { title: "Total Revenue", value: "120,000" },
  { title: "Total Expenses", value: "85,000" },
  { title: "Net Profit", value: "35,000" },
  { title: "Profit Margin", value: "29.2%" },
];

const barChartData = [
  { name: "Product Sales", revenue: 120000, expenses: 10000, profit: 35000 },
  { name: "Service Income", revenue: 80000, expenses: 25000, profit: 15500 },
  { name: "Office Rent", revenue: 100000, expenses: 35000, profit: 3000 },
  { name: "Salaries", revenue: 65000, expenses: 6000, profit: 12600 },
  { name: "Utilities", revenue: 30000, expenses: 4000, profit: 400 },
];

const tableData = [
  ["Product Sales", "120,000", "10,000", "35,000", "35,000"],
  ["Service Income", "80,000", "25,000", "13,000", "15,500"],
  ["Office Rent", "100,000", "35,000", "-5,000", "3,000"],
  ["Salaries", "65,000", "6,000", "23,000", "12,600"],
  ["Utilities", "30,000", "4,000", "500", "400"],
  ["Net Profit", "120,000", "85,000", "35,000", "35,000"],
];

const ProfitAndLossDashboard = () => {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Profit and Loss Analysis</h2>

      <div className="metrics-container">
        {metrics.map((item, index) => (
          <div key={index} className="metric-card">
            <div className="metric-title">{item.title}</div>
            <div className="metric-value">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="charts-container">
        <div className="chart-box">
          <h4>Revenue vs. Expenses</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#6366F1" name="Revenue" />
              <Bar dataKey="expenses" fill="#F87171" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h4>Profit Trends</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="profit" stroke="#34D399" strokeWidth={3} name="Profit" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Descriptions</th>
              <th>Revenue</th>
              <th>Expenses</th>
              <th>Profit</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, idx) => (
              <tr key={idx}>
                {row.map((cell, cIdx) => (
                  <td key={cIdx}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfitAndLossDashboard;