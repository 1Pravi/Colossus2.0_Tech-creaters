import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from "recharts";

const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28"];

const OverviewPage = () => {
  const [revenue, setRevenue] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [netBalance, setNetBalance] = useState(0);
  const [topExpense, setTopExpense] = useState("");
  const [plInsights, setPlInsights] = useState({});
  const [summary, setSummary] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [barData, setBarData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [paymentStatusData, setPaymentStatusData] = useState([]);

  const baseUrl = "http://localhost:5000/api";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          revenueRes,
          expensesRes,
          netBalanceRes,
          topExpenseRes,
          plInsightsRes,
          summaryRes,
          transactionsRes,
          barChartRes,
          lineChartRes,
          paymentStatusRes
        ] = await Promise.all([
          axios.get(`${baseUrl}/revenuee`),
          axios.get(`${baseUrl}/expensese`),
          axios.get(`${baseUrl}/net-balancee`),
          axios.get(`${baseUrl}/top-expense-categorye`),
          axios.get(`${baseUrl}/pl-insights`),
          axios.get(`${baseUrl}/summary`),
          axios.get(`${baseUrl}/transactions`),
          axios.get(`${baseUrl}/bar-charte`),
          axios.get(`${baseUrl}/net-balance-line-charte`),
          axios.get(`${baseUrl}/payment-status-donute`)
        ]);

        setRevenue(revenueRes.data.total_revenue);
        setExpenses(expensesRes.data.total_expenses);
        setNetBalance(netBalanceRes.data.net_balance);
        setTopExpense(topExpenseRes.data.top_expense_category);
        setPlInsights(plInsightsRes.data);
        setSummary(summaryRes.data);
        setTransactions(transactionsRes.data);
        setBarData(barChartRes.data || []);
        setLineData(lineChartRes.data || []);
        setPaymentStatusData(Array.isArray(paymentStatusRes.data) ? paymentStatusRes.data : []);
      } catch (err) {
        console.error("Error fetching overview data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Overview Dashboard</h1>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-gray-600 text-sm">Total Revenue</h2>
          <p className="text-2xl font-semibold text-green-600">₹ {revenue}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-gray-600 text-sm">Total Expenses</h2>
          <p className="text-2xl font-semibold text-red-500">₹ {expenses}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-gray-600 text-sm">Net Balance</h2>
          <p className="text-2xl font-semibold text-blue-600">₹ {netBalance}</p>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-white p-4 rounded-2xl shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-2">P&L Insights</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div><p className="text-sm text-gray-500">Max Profit Period</p><p className="font-bold">{plInsights.max_profit_period}</p></div>
          <div><p className="text-sm text-gray-500">Max Profit</p><p className="font-bold text-green-600">₹ {plInsights.max_profit_value}</p></div>
          <div><p className="text-sm text-gray-500">Min Profit Period</p><p className="font-bold">{plInsights.min_profit_period}</p></div>
          <div><p className="text-sm text-gray-500">Min Profit</p><p className="font-bold text-red-500">₹ {plInsights.min_profit_value}</p></div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h3 className="font-semibold mb-2">Revenue vs Expenses</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#34D399" />
              <Bar dataKey="expenses" fill="#F87171" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h3 className="font-semibold mb-2">Net Balance Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="net_balance" stroke="#3B82F6" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Donut Chart */}
      <div className="bg-white p-4 rounded-2xl shadow-md mb-6">
        <h3 className="font-semibold mb-2">Payment Status</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={paymentStatusData}
              dataKey="value"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {paymentStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Transactions */}
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="text-xs uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Type</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 5).map((tx, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="px-4 py-2">{tx.date}</td>
                  <td className="px-4 py-2">{tx.description}</td>
                  <td className="px-4 py-2">₹ {tx.amount}</td>
                  <td className={`px-4 py-2 ${tx.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                    {tx.type}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
