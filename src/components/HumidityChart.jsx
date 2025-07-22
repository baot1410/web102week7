"use client"

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

function HumidityChart({ data }) {
  // Prepare data for the scatter plot
  const chartData = data.map((item) => ({
    city: item.cityName,
    temperature: item.temp,
    humidity: item.rh,
  }))

  return (
    <div className="chart-container">
      <h3 className="chart-title">💧 Humidity vs Temperature</h3>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
            <XAxis type="number" dataKey="temperature" name="Temperature" tick={{ fill: "white", fontSize: 12 }} />
            <YAxis type="number" dataKey="humidity" name="Humidity" tick={{ fill: "white", fontSize: 12 }} />
            <Scatter dataKey="humidity" fill="#2196f3" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default HumidityChart
