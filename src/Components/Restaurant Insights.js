import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, PieChart, Pie, Cell
} from "recharts";
import '../styles/r.css';

const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
});

const COLORS = ["#4c83ff", "#ff7f50", "#00c49f"];

const pieData = [
  { name: "Cheque", value: 47 },
  { name: "NEFT", value: 24 },
  { name: "UPI", value: 21 },
];

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lineChartData, setLineChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  const formatMonth = (monthStr) => {
    const [year, month] = monthStr.split("-");
    const date = new Date(`${year}-${month}-01`);
    return date.toLocaleString("default", { month: "short", year: "numeric" });
  };

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/summary");
        setSummary(res.data);
      } catch (err) {
        console.error("API fetch error:", err);
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/transactions");
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchLineChartData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/line");
        const formatted = res.data.map(item => ({
          name: formatMonth(item.Month),
          value: item.Balance_After
        }));
        setLineChartData(formatted);
      } catch (error) {
        console.error("Error fetching line chart data:", error);
      }
    };

    const fetchBarChartData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bar");
        const formatted = res.data.map(item => ({
          name: formatMonth(item.name),
          inflow: item.inflow,
          outflow: item.outflow
        }));
        setBarChartData(formatted);
      } catch (error) {
        console.error("Error fetching bar chart data:", error);
      }
    };

    fetchSummary();
    fetchTransactions();
    fetchLineChartData();
    fetchBarChartData();
  }, []);

  const metrics = summary ? [
    { label: "Total Inflow", value: formatter.format(summary.total_inflow), status: "Good" },
    { label: "Total Outflow", value: formatter.format(summary.total_outflow), status: "Moderate" },
    { label: "Net Cash Flow", value: formatter.format(summary.net_cashflow), status: "Stable" },
    { label: "Current Balance", value: formatter.format(summary.current_balance), status: "Healthy" },
  ] : [];

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">

      {/* Metrics Summary */}
      <div className="metrics-summary">
        <h3 className="metrics-summary-title text-xl font-semibold mb-4">Metrics Summary</h3>
        {!summary ? (
          <div className="text-gray-500">Loading summary...</div>
        ) : (
          <div className="metrics-summary-container">
            {metrics.map((metric, i) => (
              <div key={i} className="metric-box">
                <div className="metric-content">
                  <div className="metric-title">{metric.label}</div>
                  <div className="metric-value">{metric.value}</div>
                  <div className={`metric-status ${
                    metric.status === 'Good' ? 'text-green-600' :
                    metric.status === 'Moderate' ? 'text-yellow-600' :
                    metric.status === 'Stable' ? 'text-blue-600' : 'text-purple-600'
                  }`}>
                    {metric.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h3 className="font-semibold mb-4">Cash Balance Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#4c83ff" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h3 className="font-semibold mb-4">Inflow vs. Outflow</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="inflow" fill="#00c49f" />
              <Bar dataKey="outflow" fill="#ff7f50" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white p-4 rounded-2xl shadow-md overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">Transactions</h3>
        <table className="w-full text-sm transactions-table">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Balance</th>
              <th className="p-3 text-left">Bank</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center p-3">Loading...</td>
              </tr>
            ) : (
              transactions.map((tx, i) => (
                <tr key={i} className="border-b">
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3">{tx["Description"]}</td>
                  <td className="p-3">{tx["Type"]}</td>
                  <td className="p-3">{tx["Amount"]}</td>
                  <td className="p-3">{tx["Balance_After"]}</td>
                  <td className="p-3">{tx["Bank_Name"]}</td>
                  <td className="p-3">{tx["Date"]}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pie Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h3 className="font-semibold mb-4">Transaction Mode</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
