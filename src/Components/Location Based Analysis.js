import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PlInsights = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchPlInsights = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/pl-insights");
        setData(res.data);
      } catch (err) {
        console.error("Error fetching P&L insights:", err);
      }
    };

    fetchPlInsights();
  }, []);

  if (!data) return <div className="loading">Loading P&L Insights...</div>;

  return (
    <div className="pl-container">
      <h1 className="heading"> Profit & Loss Summary</h1>

      <div className="card-grid">
        <div className="card green">
          <h2>Max Profit Month</h2>
          <p className="value">{data.max_profit_period}</p>
        </div>
        <div className="card red">
          <h2>Max Loss Month</h2>
          <p className="value">{data.min_profit_period}</p>

        </div>
        <div className="card blue">
          <h2>Profit Months</h2>
          <p className="text-list">{data.profit_months.join(", ")}</p>
        </div>
        <div className="card yellow">
          <h2>Loss Months</h2>
          <p className="text-list">{data.loss_months.join(", ")}</p>
        </div>
      </div>

      <div className="chart-container">
        <h2>Net Profit Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.line_chart_data}>
            <XAxis dataKey="Period" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Line type="monotone" dataKey="Net_Profit" stroke="#4ade80" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h2>💰 Revenue vs Operating Expenses</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.bar_chart_data}>
            <XAxis dataKey="Period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="Total_Revenue" fill="#60a5fa" />
            <Bar dataKey="Operating_Expenses" fill="#f87171" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Embedded CSS styles */}
      <style>{`
        .pl-container {
          max-width: 1200px;
          margin: auto;
          padding: 2rem;
          font-family: 'Segoe UI', sans-serif;
        }

        .heading {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          text-align: center;
          color: #2c3e50;
        }

        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .card {
          background: white;
          border-radius: 16px;
          padding: 1.25rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease;
        }

        .card:hover {
          transform: scale(1.03);
        }

        .green { background: #e6fffa; border-left: 6px solid #f43f5e; }
        .green { background: #e6fffa; border-left: 6px solid #f43f5e; }
        .green { background: #e6fffa; border-left: 6px solid #3b82f6; }
        .green { background: #e6fffa; border-left: 6px solid #eab308; }

        .value {
          font-size: 1.25rem;
          font-weight: 600;
        }

        .amount {
          font-size: 1.1rem;
          color: #10b981;
        }

        .text-list {
          font-size: 0.95rem;
          color: #374151;
        }

        .chart-container {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          margin-top: 2rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }

        .chart-container h2 {
          font-size: 1.2rem;
          margin-bottom: 1rem;
          color: #1f2937;
        }

        .loading {
          text-align: center;
          padding: 3rem;
          font-size: 1.25rem;
        }
      `}</style>
    </div>
  );
};

export default PlInsights;
