import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiCloud, FiCloudRain, FiSun, FiWind, FiDroplets, FiAlertTriangle } from 'react-icons/fi';
import { weatherAPI } from '../services/api';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [latitude, setLatitude] = useState(13.0827);
  const [longitude, setLongitude] = useState(80.2707);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWeather();
  }, [latitude, longitude]);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const weatherRes = await weatherAPI.getCurrentWeather({ latitude, longitude });
      setWeather(weatherRes.data);

      const forecastRes = await weatherAPI.getForecast({ latitude, longitude });
      setForecast(forecastRes.data.forecast);

      const alertsRes = await weatherAPI.getAlerts();
      setAlerts(alertsRes.data);
    } catch (error) {
      toast.error('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          toast.error('Unable to get your location');
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="section-title">Weather Forecast</h1>
          <p className="section-subtitle">
            Location-based weather predictions for optimal farming
          </p>
          <button
            onClick={handleGetLocation}
            className="btn-secondary mt-4"
          >
            Use My Location
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-secondary-green"></div>
            <p className="mt-4 text-gray-600">Loading weather...</p>
          </div>
        ) : (
          <>
            {/* Current Weather */}
            {weather && (
              <div className="card mb-12 bg-gradient-to-br from-primary-green to-secondary-green text-white">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-lg opacity-90">Current Weather</p>
                    <p className="text-sm opacity-75">Lat: {latitude.toFixed(4)}, Lon: {longitude.toFixed(4)}</p>
                  </div>
                  <FiSun className="text-4xl" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <p className="text-sm opacity-90 mb-2">Temperature</p>
                    <p className="text-4xl font-bold">{weather.temperature}°C</p>
                    <p className="text-sm opacity-75">Feels like {weather.feelsLike}°C</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-90 mb-2">Condition</p>
                    <p className="text-2xl font-bold">{weather.condition}</p>
                  </div>
                  <div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs opacity-90">Humidity</p>
                        <p className="text-xl font-bold">{weather.humidity}%</p>
                      </div>
                      <div>
                        <p className="text-xs opacity-90">Wind Speed</p>
                        <p className="text-xl font-bold">{weather.windSpeed} km/h</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Weather Alerts */}
            {alerts.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-primary-green mb-6">⚠️ Weather Alerts</h2>
                <div className="space-y-4">
                  {alerts.map((alert, idx) => (
                    <div
                      key={idx}
                      className={`card border-l-4 ${
                        alert.severity === 'warning' ? 'border-red-500 bg-red-50' :
                        alert.severity === 'caution' ? 'border-yellow-500 bg-yellow-50' :
                        'border-blue-500 bg-blue-50'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <FiAlertTriangle className="text-2xl mt-1 flex-shrink-0" />
                        <div className="flex-grow">
                          <h3 className="font-bold text-primary-green mb-1">{alert.message}</h3>
                          <p className="text-gray-700 mb-2">{alert.recommendation}</p>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            alert.severity === 'warning' ? 'bg-red-200 text-red-800' :
                            alert.severity === 'caution' ? 'bg-yellow-200 text-yellow-800' :
                            'bg-blue-200 text-blue-800'
                          }`}>
                            {alert.severity.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7-Day Forecast */}
            {forecast.length > 0 && (
              <div className="card">
                <h2 className="text-2xl font-bold text-primary-green mb-6">7-Day Forecast</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {forecast.map((day, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-light-green to-secondary-green text-white rounded-lg p-4"
                    >
                      <h3 className="font-bold mb-3">{day.day}</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">High</span>
                          <span className="font-semibold">{day.high}°C</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Low</span>
                          <span className="font-semibold">{day.low}°C</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Condition</span>
                          <span className="font-semibold text-xs">{day.condition}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Rainfall</span>
                          <span className="font-semibold">{day.rainfall} mm</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Farming Tips */}
            <div className="card mt-8">
              <h2 className="text-2xl font-bold text-primary-green mb-4">💡 Farming Tips Based on Weather</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-semibold text-primary-green mb-2">✓ Irrigation</p>
                  <p className="text-sm text-gray-700">
                    With moderate humidity and low rainfall expected, maintain regular irrigation schedules.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="font-semibold text-primary-green mb-2">✓ Pesticides</p>
                  <p className="text-sm text-gray-700">
                    Dry weather is ideal for spraying pesticides. Plan applications accordingly.
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="font-semibold text-primary-green mb-2">✓ Harvesting</p>
                  <p className="text-sm text-gray-700">
                    Sunny days coming up are perfect for harvesting operations.
                  </p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="font-semibold text-primary-green mb-2">✓ Soil Care</p>
                  <p className="text-sm text-gray-700">
                    Expected rainfall will help with soil moisture. Plan tilling accordingly.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;
