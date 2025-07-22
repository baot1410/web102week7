"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import CityDetail from "./components/CityDetail"
import { mockWeatherData } from "./mockData"
import "./App.css"

function App() {
  const [weatherData, setWeatherData] = useState([])

  useEffect(() => {
    // Use mock data instead of API calls to avoid rate limiting
    setWeatherData(mockWeatherData)
  }, [])

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Dashboard weatherData={weatherData} />} />
          <Route path="/city/:cityName" element={<CityDetail weatherData={weatherData} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
