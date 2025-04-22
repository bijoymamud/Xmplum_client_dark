import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";

const UserGraph = ({ chartData, isDarkMode }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={chartData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid
          strokeDasharray="2 2"
          vertical={false}
          stroke={isDarkMode ? "#4B5563" : "#E5E7EB"}
        />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 15, fill: isDarkMode ? "#D1D5DB" : "#6B7280" }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 15, fill: isDarkMode ? "#D1D5DB" : "#6B7280" }}
          tickFormatter={(value) => `${value / 1000}k`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div
                  className={`px-3 py-1 rounded shadow-md text-center ${
                    isDarkMode ? "bg-gray-700 text-gray-100" : "bg-blue-800 text-white"
                  }`}
                >
                  <p className="text-[15px] font-medium">
                    ${payload[0].value.toLocaleString()}
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1e40af" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#1e40af" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke="#1e40af"
          strokeWidth={2}
          fill="url(#colorValue)"
          dot={{ r: 4, fill: "#1e40af", strokeWidth: 0 }}
          activeDot={{ r: 6, fill: "#1e40af", stroke: "#fff", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default UserGraph;