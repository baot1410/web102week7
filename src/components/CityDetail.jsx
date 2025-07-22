"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Header from "./Header"
import NavBar from "./NavBar"

function CityDetail({ weatherData }) {
  const { cityName } = useParams()
  const [cityData, setCityData] = useState(null)
  const [activeView, setActiveView] = useState("dashboard")

  useEffect(() => {
    const decodedCityName = decodeURIComponent(cityName)
    const foundCity = weatherData.find((city) => city.cityName === decodedCityName)
    setCityData(foundCity)
  }, [cityName, weatherData])

  if (!cityData) {
    return (
      <>
        <Header />
        <div className="main-content">
          <NavBar activeView={activeView} setActiveView={setActiveView} />
          <div className="dashboard">
            <div className="loading">City not found or loading...</div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="main-content">
        <NavBar activeView={activeView} setActiveView={setActiveView} />
        <div className="dashboard">
          <div className="city-detail">
            <div className="detail-header">
              <Link to="/" className="back-link">
                ← Back to Dashboard
              </Link>
              <h1>{cityData.cityName} Weather Details</h1>
              <p className="detail-subtitle">Current weather conditions and detailed information</p>
            </div>

            <div className="detail-cards-grid">
              <div className="detail-card highlight-card">
                <h3>🌡️ Temperature</h3>
                <div className="big-stat">{cityData.temp}°F</div>
                <p>Feels like {cityData.app_temp}°F</p>
              </div>

              <div className="detail-card highlight-card">
                <h3>🌤️ Condition</h3>
                <div className="condition-text">{cityData.weather.description}</div>
                <p>{cityData.clouds}% cloud coverage</p>
              </div>

              <div className="detail-card highlight-card">
                <h3>💨 Wind</h3>
                <div className="big-stat">{cityData.wind_spd.toFixed(1)} mph</div>
                <p>Direction: {cityData.wind_cdir}</p>
              </div>
            </div>

            <div className="detail-sections">
              <div className="detail-section">
                <h3>🌡️ Temperature & Comfort</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Current Temperature:</span>
                    <span className="detail-value">{cityData.temp}°F</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Feels Like:</span>
                    <span className="detail-value">{cityData.app_temp}°F</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Humidity:</span>
                    <span className="detail-value">{cityData.rh}%</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">UV Index:</span>
                    <span className="detail-value">{cityData.uv.toFixed(1)}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>💨 Wind & Atmospheric</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Wind Speed:</span>
                    <span className="detail-value">{cityData.wind_spd.toFixed(1)} mph</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Wind Direction:</span>
                    <span className="detail-value">{cityData.wind_cdir}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Pressure:</span>
                    <span className="detail-value">{cityData.pres.toFixed(1)} mb</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Visibility:</span>
                    <span className="detail-value">{cityData.vis.toFixed(1)} km</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>☁️ Sky Conditions</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Weather:</span>
                    <span className="detail-value">{cityData.weather.description}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Cloud Coverage:</span>
                    <span className="detail-value">{cityData.clouds}%</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Timezone:</span>
                    <span className="detail-value">{cityData.timezone}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Weather Station:</span>
                    <span className="detail-value">{cityData.station}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CityDetail
