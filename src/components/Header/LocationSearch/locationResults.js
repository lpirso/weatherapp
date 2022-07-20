import React from "react";

import classes from "./locationSearch.module.css";

const LocationResults = props => {
    const {locationResults, setChosenLocation, isLoading, fetchError, setSearchPhrase} = props;
 
    if (isLoading) {
        return <div className={classes.loader}>Loading...</div>;
    }

    if (fetchError) {
        return <div className={classes.error}>{fetchError}</div>;
    }

    if (!locationResults?.length) {
        return <div className={classes.noResults}>No results found</div>;
    }

    return  (
        <div className={classes.results}>
            {locationResults.map((location) => {
                const { name, country, lat, lon } = location;
                const key = lat.toString().concat(lon.toString());

                const handleClick = () => {
                    const newLocation = { lat, lon, name };
                    setChosenLocation({...newLocation});
                    setSearchPhrase("");
                }

                return (
                    <button className={classes.option} onClick={handleClick} key={key}>
                        <span>{name}</span>
                        <span>{country}</span>
                        <span>Latitude: {lat}</span>
                        <span>Longitude: {lon}</span>
                    </button>
                )
            })}
        </div>
    );
};

export default LocationResults;