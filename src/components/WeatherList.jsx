"use client"

import { Link } from "react-router-dom"

function WeatherList({ data, searchTerm, setSearchTerm, tempFilter, setTempFilter }) {
  return (
    <div className="weather-list">
      <div className="list-header">
        <h2>Weather Data</h2>
        <div className="filters">
          <input
            type="text"
            placeholder="Search cities or weather..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select value={tempFilter} onChange={(e) => setTempFilter(e.target.value)} className="temp-filter">
            <option value="">All Temperatures</option>
            <option value="cold">Cold (&lt; 50°F)</option>
            <option value="mild">Mild (50-70°F)</option>
            <option value="warm">Warm (70-85°F)</option>
            <option value="hot">Hot (&gt; 85°F)</option>
          </select>
        </div>
      </div>

      <div className="list-container">
        <div className="list-table">
          <div className="table-header">
            <div className="table-cell">City</div>
            <div className="table-cell">Temperature</div>
            <div className="table-cell">Details</div>
          </div>
          {data.map((item, index) => (
            <div key={index} className="table-row">
              <div className="table-cell">
                <Link to={`/city/${encodeURIComponent(item.cityName)}`} className="city-link">
                  {item.cityName}
                </Link>
              </div>
              <div className="table-cell">{item.temp}°F</div>
              <div className="table-cell">
                <Link to={`/city/${encodeURIComponent(item.cityName)}`} className="detail-link">
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WeatherList
