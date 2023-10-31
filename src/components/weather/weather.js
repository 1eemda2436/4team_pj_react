import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const city = "Seoul";
            const apiKey = "bd392c52a5080b92af365b1a670d8782";
            const lang = "kr";
            const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=${lang}&units=metric`;
            const response = await axios.get(apiUrl);
            setWeatherData(response.data);
        } catch (error) {
            console.error("Error fetching data: " + error);
        }
        };

        fetchData();
    }, []);

    return (
        <WeatherContainer>
            {weatherData ? (
            <div>
                <WeatherHeader>Weather in {weatherData.name}</WeatherHeader>
                <WeatherInfo>현재 온도: {weatherData.main.temp}°C</WeatherInfo>
                <WeatherInfo>날씨: {weatherData.weather[0].description}</WeatherInfo>
                
            </div>
            ) : (
            <p>Loading weather data...</p>
            )}
        </WeatherContainer>
    );
};

export default Weather;

const WeatherContainer = styled.div`
    text-align: center;
    background-color: #f0f0f0;
    padding: 20px;
`;

const WeatherHeader = styled.h1`
    font-size: 24px;
    font-weight: bold;
`;

const WeatherInfo = styled.p`
    font-size: 18px;
`;