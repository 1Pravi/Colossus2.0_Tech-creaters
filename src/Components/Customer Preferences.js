import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import "../styles/Customer Preferences.css"; // keep your existing stylesheet

const barData = [
  { month: "Apr", revenue: 60000, expenses: 40000 },
  { month: "May", revenue: 75000, expenses: 50000 },
  { month: "Jun", revenue: 80000, expenses: 60000 },
  { month: "Jul", revenue: 90000, expenses: 50000 },
  { month: "Sep", revenue: 78000, expenses: 36000 }
];

const pieData = [
  { name: "Paid", value: 20 },
  { name: "Pending", value: 20 },
  { name: "Cancelled", value: 10 }
];

const COLORS = ["#4CAF50", "#8884d8", "#FF8042"];

const lineData = [
  { month: "Apr", balance: 20000 },
  { month: "Jun", balance: 50000 },
  { month: "Jul", balance: 30000 },
  { month: "Sep", balance: 60000 },
  { month: "Oct", balance: 48000 }
];

const tableData = [
  {
    id: "T0001",
    date: "2024-10-01",
    customer: "BuildTech Ltd.",
    service: "Hydraulic Press",
    category: "Machinary",
    quantity: 3115,
    amount: "31,915.7",
    status: "Pending"
  },
  {
    id: "T0002",
    date: "2024-10-28",
    customer: "",
    service: "Cash",
    category: "",
    quantity: 31315,
    amount: "-698.7",
    status: "Pending"
  }
];

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2 className="title">Revenue Expense Analysis</h2>

      {/* Summary Boxes */}
      <div className="summary-row">
        <div className="summary-box">
          <h4>Total Revenue</h4>
          <p className="amount">$524,000</p>
        </div>
        <div className="summary-box">
          <h4>Total Expenses</h4>
          <p className="amount">$386,000</p>
        </div>
        <div className="summary-box">
          <h4>Net Balance</h4>
          <p className="amount positive">$138,000</p>
        </div>
        <div className="summary-box">
          <h4>Top Expense Category</h4>
          <p className="highlight">Manufacturing</p>
        </div>
      </div>

      {/* Revenue and Expenses + Payment Status Charts */}
      <div className="charts-section">
        <div className="chart-box">
          <h4>Revenue and Expenses</h4>
          <BarChart width={400} height={250} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#8884d8" radius={[8, 8, 0, 0]} />
            <Bar dataKey="expenses" fill="#82ca9d" radius={[8, 8, 0, 0]} />
          </BarChart>
        </div>

        <div className="chart-box">
          <h4>Payment Status</h4>
          <PieChart width={250} height={250}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </div>
      </div>

      {/* Net Balance Line Chart */}
      <div className="line-chart-box">
        <h4>Net Balance</h4>
        <LineChart width={600} height={250} data={lineData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="balance" stroke="#8884d8" strokeWidth={3} />
        </LineChart>
      </div>

      {/* Transaction Table */}
      <div className="transaction-table">
        <h4>Transaction History</h4>
        <table>
          <thead>
            <tr>
              <th>Transaction_ID</th>
              <th>Date</th>
              <th>Customer Name</th>
              <th>Product/Service</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Total Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.id}</td>
                <td>{row.date}</td>
                <td>{row.customer}</td>
                <td>{row.service}</td>
                <td>{row.category}</td>
                <td>{row.quantity}</td>
                <td>{row.amount}</td>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
