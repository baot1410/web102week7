"use client"

import { useState, useEffect } from "react"
import Header from "./Header"
import NavBar from "./NavBar"
import Card from "./Card"
import WeatherList from "./WeatherList"
import TemperatureChart from "./TemperatureChart"
import HumidityChart from "./HumidityChart"

function Dashboard({ weatherData }) {
  const [filteredData, setFilteredData] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [tempFilter, setTempFilter] = useState("")
  const [activeView, setActiveView] = useState("dashboard")

  useEffect(() => {
    setFilteredData(weatherData)
  }, [weatherData])

  // Filter data based on search and temperature filter
  useEffect(() => {
    let filtered = weatherData

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.cityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.weather.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (tempFilter) {
      filtered = filtered.filter((item) => {
        const temp = item.temp
        switch (tempFilter) {
          case "cold":
            return temp < 50
          case "mild":
            return temp >= 50 && temp < 70
          case "warm":
            return temp >= 70 && temp < 85
          case "hot":
            return temp >= 85
          default:
            return true
        }
      })
    }

    setFilteredData(filtered)
  }, [searchTerm, tempFilter, weatherData])

  // Calculate summary statistics
  const getStats = () => {
    if (weatherData.length === 0) return { avgTemp: 0, maxTemp: 0, minTemp: 0 }

    const temps = weatherData.map((item) => item.temp)
    const avgTemp = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1)
    const maxTemp = Math.max(...temps).toFixed(1)
    const minTemp = Math.min(...temps).toFixed(1)

    return { avgTemp, maxTemp, minTemp }
  }

  const stats = getStats()

  return (
    <>
      <Header />
      <div className="main-content">
        <NavBar activeView={activeView} setActiveView={setActiveView} />
        <div className="dashboard">
          {activeView === "dashboard" && (
            <>
              <div className="cards-container">
                <Card title="Average Temp" value={`${stats.avgTemp}°F`} />
                <Card title="Highest Temp" value={`${stats.maxTemp}°F`} />
                <Card title="Lowest Temp" value={`${stats.minTemp}°F`} />
              </div>

              {/* Charts Section */}
              <div className="charts-section">
                <TemperatureChart data={weatherData} />
                <HumidityChart data={weatherData} />
              </div>

              <WeatherList
                data={filteredData}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                tempFilter={tempFilter}
                setTempFilter={setTempFilter}
              />
            </>
          )}
          {activeView === "search" && (
            <div className="search-view">
              <h2>Search Weather Data</h2>
              <WeatherList
                data={filteredData}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                tempFilter={tempFilter}
                setTempFilter={setTempFilter}
              />
            </div>
          )}
          {activeView === "about" && (
            <div className="about-view">
              <h2>About WeatherDash</h2>
              <p>This dashboard displays current weather data for major US cities using mock data.</p>
              <p>
                Features include real-time weather data, search functionality, temperature filtering, and data
                visualizations.
              </p>
              <p>
                The charts show temperature comparisons and the relationship between humidity and temperature across
                cities.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Dashboard
