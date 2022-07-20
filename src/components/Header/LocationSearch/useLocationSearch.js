import { useEffect, useState } from "react";

export const useLocationSearch = () => {
  const [locationResults, setLocationResults] = useState();

  const [searchPhrase, setSearchPhrase] = useState("");

  const [fetchError, setFetchError] = useState("");
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);

  const fetchPossibleLocations = async (searchPhrase) => {
    if (searchPhrase.length < 3) return;

    setFetchError("");
    setIsLoadingLocations(true);

    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${searchPhrase}&limit=5&appid=b7bd04ff4941691fddf8fc97b8897d61`
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setLocationResults(data);
      setIsLoadingLocations(false);
    } catch (error) {
      setIsLoadingLocations(false);
      setFetchError(error.message);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchPossibleLocations(searchPhrase);
    }, 400);

    return () => clearTimeout(delay);
  }, [searchPhrase]);

  return {
    searchPhrase,
    setSearchPhrase,
    locationResults,
    isLoadingLocations,
    fetchError,
  };
};
