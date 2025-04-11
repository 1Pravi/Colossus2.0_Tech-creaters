// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

const Dashboard = () => {
  const [cards, setCards] = useState({});
  const [barData, setBarData] = useState([]);
  const [donutData, setDonutData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/revenuee').then(res =>
      setCards(prev => ({ ...prev, revenue: res.data.total_revenue }))
    );
    axios.get('http://localhost:5000/api/expensese').then(res =>
      setCards(prev => ({ ...prev, expenses: res.data.total_expenses }))
    );
    axios.get('http://localhost:5000/api/net-balancee').then(res =>
      setCards(prev => ({ ...prev, net: res.data.net_balance }))
    );
    axios.get('http://localhost:5000/api/top-expense-categorye').then(res =>
      setCards(prev => ({ ...prev, topCategory: res.data.top_expense_category }))
    );
    axios.get('http://localhost:5000/api/bar-charte').then(res =>
      setBarData(res.data)
    );
    axios.get('http://localhost:5000/api/payment-status-donute').then(res => {
      const chart = Object.entries(res.data).map(([name, value], i) => ({
        name,
        value,
        color: COLORS[i % COLORS.length]
      }));
      setDonutData(chart);
    });
    axios.get('http://localhost:5000/api/net-balance-line-charte').then(res =>
      setLineData(res.data)
    );
    axios.get('http://localhost:5000/api/transaction-historye').then(res =>
      setTransactions(res.data)
    );
  }, []);

  return (
    <div className="p-6 font-sans bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Business Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card title="Total Revenue" value={`₹${cards.revenue?.toFixed(2)}`} bg="bg-green-100" text="text-green-800" />
        <Card title="Total Expenses" value={`₹${cards.expenses?.toFixed(2)}`} bg="bg-red-100" text="text-red-800" />
        <Card title="Net Balance" value={`₹${cards.net?.toFixed(2)}`} bg="bg-blue-100" text="text-blue-800" />
        <Card title="Top Expense Category" value={cards.topCategory} bg="bg-yellow-100" text="text-yellow-800" />
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Monthly Revenue vs Expenses</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#4ade80" />
            <Bar dataKey="expense" fill="#f87171" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Donut and Line Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Payment Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={donutData} dataKey="value" nameKey="name" outerRadius={100} label>
                {donutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Net Balance Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="net_balance" stroke="#60a5fa" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-2">{t.Date}</td>
                  <td className="px-4 py-2">{t.Customer_Name}</td>
                  <td className="px-4 py-2">{t['Product/Service']}</td>
                  <td className="px-4 py-2">₹{t.Net_Revenue?.toFixed(2)}</td>
                  <td className="px-4 py-2">{t.Status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, value, bg, text }) => (
  <div className={`p-6 rounded-xl shadow ${bg}`}>
    <h3 className="text-sm font-semibold text-gray-600">{title}</h3>
    <p className={`text-xl font-bold mt-2 ${text}`}>{value}</p>
  </div>
);

export default Dashboard;

