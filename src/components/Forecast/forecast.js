import React from 'react';

import classes from './forecast.module.css';

const Forecast = ({ chosenLocationForecast, unitSymbol }) => {
    if (!chosenLocationForecast) {
        return null;
    }

    return (
        <>
            <h2>Forecast</h2>
            <div className={classes.root}>
                {chosenLocationForecast.map((weatherInfo, index) => {
                    const {
                        dt_txt,
                        weather,
                        main,
                        wind
                    } = weatherInfo;
                    const date = new Date(dt_txt);
                    const hours = date.getHours();

                    if (index === 0 || hours !== 12) {
                        return null;
                    };

                    const iconClass = `${classes.icon} wi wi-owm-${weather[0].id}`;

                    return (
                        <div className={classes.day} key={dt_txt}>
                            <div className={classes.date}>{date.toDateString()}</div>
                            <i className={iconClass} />
                            <div className={classes.temp}>{main.temp + ' ' + unitSymbol}</div>
                            <div className={classes.feels}>{main.feels_like + ' ' + unitSymbol}</div>
                            <div className={classes.wind}>Wind: {wind.speed}m/s</div>
                        </div>
                    );
                })}
            </div>
        </>
    )
}

export default Forecast;