import React, { useState } from 'react'
import Input from './components/input'
import { CardContent, Cards } from './components/Cards'
import { Button } from './components/Button'
import { Sun, CloudRain, Snowflake, Cloud } from 'lucide-react'

const API_KEY = '6812aea6c5ba6685bc25b55fae2fb06f'

export const WeatherApp = () => {

    const [city, setCity] = useState('')
    // console.log('Current city:', city)
    const [weather, setWeather] = useState(null)
    // console.log('Current weather:', weather)
    const [loading, setLoading] = useState(false)
    // console.log('Loading state:', loading)
    const [error, setError] = useState('')
    // console.log('Current error:', error)

    const fetchWeather = async () => {
        // console.log('Fetching weather for:', city)
        setLoading(true)
        setError('')
        try {
            // console.log('API call made')
            const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + API_KEY + '&units=metric')
            // console.log('Response status:', response.status)
            if (!response.ok) throw new Error('City not found')
            const data = await (response.json())
            console.log('Received weather data:', data)
            setWeather(data)
        } catch (error) {
            console.error('Error fetching weather:', error)
            setError(error.message)
            setWeather(null)
        }
        setLoading(false)
        // console.log('Weather fetched')
    }

    const getWeatherIcon = (main) => {
        switch (main) {
            case "Clear":
                return <Sun className='text-yellow-400 w-10 h-10' />
            case "Clouds":
                return <Cloud className='text-yellow-400 w-10 h-10' />
            case "Rain":
                return <CloudRain className='text-blue-400 w-10 h-10' />
            case "Snow":
                return <Snowflake className='text-blue-200 w-10 h-10' />
            default:
                return null
        }
    }

    return (
        <Cards className='min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center p-4'>
            <CardContent className='max-w-[1920px] p-8 shadow-2x1 rounded-2x1 bg-white md:w-full lg:w-full xl:w-full'>
                    <div className="mb-12 text-center">
                        <p className="text-xl font-bold text-black-300">Find out the weather of any city</p>
                    </div>

                    <div className='mb-8 flex-col flex items-center'>
                    <Input 
                        type='text'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder='Enter city Name'
                    />
                    </div>
                    <div className="mb-8 flex flex-col items-center">
                        <Button
                            onClick={() => { console.log('Button clicked'); fetchWeather() }}
                            disabled={loading}
                            className='w-[500px] bg-blue-500 text-white px-4 py-3 rounded hover:bg-blue-600 transition duration-300 ease-in-out'
                        >
                            {loading ? 'Loading...' : "Search"}
                        </Button>
                    </div>
                    {error && (
                        <p className="text-red-500 text-center mb-8">{error}</p>
                    )}

                    {weather && (
                        <div className='space-y-8 '>
                            <div className='flex items-center flex-col '>
                                {
                                    getWeatherIcon(weather.weather[0].main)
                                }
                                <div>
                                    <h2 className='text-3x1 font-bold mb-2'>{weather.name},{weather.sys.country}</h2>
                                    <p className='text-xl text-gray-600 mb-4 '>
                                        {weather.weather[0].description},
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                                <h3 className="text-2xl font-bold mb-4">Current Weather</h3>
                                <p className="text-lg"><span className="font-bold">Temperature:</span> {Math.round(weather.main.temp)}°C</p>
                                <p className="text-lg"><span className="font-bold">Humidity:</span> {weather.main.humidity}%</p>
                                <p className="text-lg"><span className="font-bold">Wind Speed:</span> {weather.wind.speed} m/s</p>
                            </div>

                            {/* <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold mb-2">Forecast</h3>
                                {weather.list.slice(0, 5).map((item, index) => (
                                    <div key={index} className="flex justify-between items-center mb-2">
                                        <span>{new Date(item.dt * 1000).toLocaleString()}</span>
                                        <span>{item.main.temp}°C</span>
                                    </div>
                                ))}
                            </div> */}
                        </div>
                    )
                    }

                    {
                        loading && (
                            <div className="mb-8 text-center">
                                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                                <p>Loading...</p>
                            </div>
                        )
                    }
                </CardContent >
            </Cards >
    )
}