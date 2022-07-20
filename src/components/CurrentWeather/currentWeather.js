import React from "react";

import classes from "./currentWeather.module.css";

const CurrentWeather = ({ chosenLocationCurrentWeather, unitSymbol }) => {
  if (!chosenLocationCurrentWeather) {
    return null;
  }

  const { weather, main, wind } = chosenLocationCurrentWeather;

  const iconClass = `${classes.icon} wi wi-owm-${weather[0].id}`;

  return (
    <>
      <h2>Current Weather</h2>
      <div className={classes.root}>
        <i className={iconClass} />
        <div className={classes.temp}>{main.temp + " " + unitSymbol}</div>
        <div className={classes.feels}>
          Feels like {main.feels_like + " " + unitSymbol}
        </div>
        <div className={classes.wind}>Wind: {wind.speed}m/s</div>
      </div>
    </>
  );
};

export default CurrentWeather;
