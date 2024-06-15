import React, {useState, useEffect} from 'react'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import ToggleSwitch from './components/ToggleSwitch'
import Loader from './components/Loader'
import './App.css'

const App = () => {
  const [weatherData, setWeatherData] = useState([])
  const [loading, setLoading] = useState(false)
  const [theme, setTheme] = useState('light')

  const fetchWeather = async query => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=5f499b28958325e828ebf9be210b3677`,
      )
      setWeatherData(prevData => [...prevData, response.data])
    } catch (error) {
      console.error('Error fetching the weather data', error)
      alert('Invalid location or error fetching data')
    } finally {
      setLoading(false)
    }
  }

  const clearHistory = () => {
    setWeatherData([])
  }

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  return (
    <div className={`app ${theme}`}>
      <ToggleSwitch toggleTheme={toggleTheme} />
      <SearchBar onSearch={fetchWeather} />
      <div className="weather-cards-container">
        {loading ? (
          <Loader />
        ) : (
          <>
            {weatherData.map((weather, index) => (
              <WeatherCard key={index} weather={weather} theme={theme} />
            ))}
          </>
        )}
      </div>
      {weatherData.length > 0 && (
        <button
          className={`clear-history-button ${theme}`}
          onClick={clearHistory}
        >
          Clear History
        </button>
      )}
    </div>
  )
}

export default App
