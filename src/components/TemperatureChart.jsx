"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

function TemperatureChart({ data }) {
  // Prepare data for the chart - sort by temperature for better visualization
  const chartData = data
    .map((item) => ({
      city: item.cityName,
      temperature: item.temp,
    }))
    .sort((a, b) => b.temperature - a.temperature)
    .slice(0, 10) // Show top 10 cities

  return (
    <div className="chart-container">
      <h3 className="chart-title">🌡️ Temperature by City (Top 10)</h3>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
            <XAxis dataKey="city" tick={{ fill: "white", fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
            <YAxis tick={{ fill: "white", fontSize: 12 }} />
            <Bar dataKey="temperature" fill="#4caf50" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default TemperatureChart
