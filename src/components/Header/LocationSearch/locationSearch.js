import React from "react";

import { useLocationSearch } from "./useLocationSearch";
import LocationResults from "./locationResults";
import classes from "./locationSearch.module.css";

const LocationSearch = ({ setChosenLocation }) => {
  const {
    searchPhrase,
    setSearchPhrase,
    locationResults,
    isLoadingLocations,
    fetchError,
  } = useLocationSearch({});

  const shouldShowDropdown =
    searchPhrase.length > 2 &&
    (isLoadingLocations || locationResults || fetchError);

  return (
    <div className={classes.root}>
      <input
        onChange={(event) => setSearchPhrase(event.target.value)}
        placeholder="Search for a location..."
        className={classes.input}
        type="text"
        value={searchPhrase}
      />
      {shouldShowDropdown && (
        <div className={classes.dropdown}>
          <LocationResults
            locationResults={locationResults}
            setChosenLocation={setChosenLocation}
            searchPhrase={searchPhrase}
            isLoading={isLoadingLocations}
            fetchError={fetchError}
            setSearchPhrase={setSearchPhrase}
          />
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
