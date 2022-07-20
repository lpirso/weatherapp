import { useEffect, useState, useCallback } from "react";

export const useApp = () => {
    const savedLocation =  JSON.parse(localStorage.getItem("chosenLocation")) || {};
    const savedTempUnit = JSON.parse(localStorage.getItem("tempUnit"));
    const savedChosenLocationWeather = JSON.parse(localStorage.getItem("chosenLocationWeather"));

    const [chosenLocation, setChosenLocation] = useState(savedLocation);
    const [tempUnit, setTempUnit] = useState(savedTempUnit);
    const [chosenLocationWeather, setChosenLocationWeather] = useState(savedChosenLocationWeather);

    const [fetchError, setFetchError] = useState("");
    const [isLoadingCurrentAndForecast, setIsLoadingCurrentAndForecast] = useState(false);

    const fetchCurrentAndForecastWeather = useCallback( async (chosenLocation, tempUnit) => {
        const { lat, lon } = chosenLocation;
        
        setFetchError("");
        setIsLoadingCurrentAndForecast(true);

        try {
            const response = await fetch(
                `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${tempUnit}&appid=b7bd04ff4941691fddf8fc97b8897d61`
            );

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            setChosenLocationWeather(data);
            localStorage.setItem('chosenLocationWeather', JSON.stringify(data));
            setIsLoadingCurrentAndForecast(false);
        } catch (error) {
            setIsLoadingCurrentAndForecast(false);
            setFetchError(error.message);
        }
    },[]);

    useEffect(() => {
        if (chosenLocation.lat && chosenLocation.lon) {
            localStorage.setItem('chosenLocation', JSON.stringify(chosenLocation));

            if (tempUnit !== savedTempUnit) {
                localStorage.setItem('tempUnit', JSON.stringify(tempUnit));
            }

            fetchCurrentAndForecastWeather(chosenLocation, tempUnit);
        }
    }, [chosenLocation, tempUnit, fetchCurrentAndForecastWeather, savedTempUnit]);

    const chosenLocationCurrentWeather = chosenLocationWeather?.list[0];
    const chosenLocationForecast = chosenLocationWeather?.list;

    return {
        setChosenLocation,
        setTempUnit,
        chosenLocationCurrentWeather,
        chosenLocationForecast,
        fetchError,
        isLoadingCurrentAndForecast,
        chosenLocation,
        tempUnit
    };
};