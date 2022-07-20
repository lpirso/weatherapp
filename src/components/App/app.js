import React from 'react';

import Header from '../Header';
import CurrentWeather from '../CurrentWeather';
import Forecast from '../Forecast';

import { useApp } from './useApp';
import classes from './app.module.css';

const App = () => {
  const {
    setChosenLocation,
    setTempUnit,
    chosenLocationCurrentWeather,
    chosenLocationForecast,
    fetchError,
    isLoadingCurrentAndForecast,
    chosenLocation,
    tempUnit
  } = useApp();

  let content;

  if (isLoadingCurrentAndForecast) {
    content = <div className={classes.loader}>Loading...</div>;
  } else if (fetchError) {
    content = <div className={classes.error}>Error: {fetchError}</div>;
  } else if (chosenLocationCurrentWeather && chosenLocationForecast) {
    const unitSymbol = tempUnit === 'metric' ? '\u00b0C' : '\u00b0F';

    content = (
      <>
        <div className={classes.heading}>
          <h1>{chosenLocation.name}</h1>
          <small>Latitude: {chosenLocation.lat}</small>
          <small>Longitude: {chosenLocation.lon}</small>
        </div>
        <CurrentWeather unitSymbol={unitSymbol} chosenLocationCurrentWeather={chosenLocationCurrentWeather} />
        <Forecast unitSymbol={unitSymbol} chosenLocationForecast={chosenLocationForecast} />
      </>
    );
  }

  return (
    <div className={classes.root}>
      <Header tempUnit={tempUnit} setTempUnit={setTempUnit} setChosenLocation={setChosenLocation} />
      <div className={classes.content}>
        {content}
      </div>
    </div>
  );
}

export default App;
