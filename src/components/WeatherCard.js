import React from 'react'

const WeatherCard = ({weather, theme}) => {
  if (!weather) return null

  const {name, main, weather: weatherDetails, wind, dt} = weather
  const date = new Date(dt * 1000)

  const cardStyles = {
    backgroundColor: theme === 'dark' ? '#444' : '#fff',
    color: theme === 'dark' ? '#fff' : '#000',
    border: `1px solid ${theme === 'dark' ? '#444' : '#ccc'}`,
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    flex: '1 0 200px',
    maxWidth: '200px',
  }

  return (
    <div style={cardStyles}>
      <h2>{name}</h2>
      <p>
        {date.toLocaleDateString()} {date.toLocaleTimeString()}
      </p>
      <p>Temperature: {main.temp}°C</p>
      <p>Weather: {weatherDetails[0].description}</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Wind Speed: {wind.speed} m/s</p>
    </div>
  )
}

export default WeatherCard
