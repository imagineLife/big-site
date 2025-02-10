import { useEffect, useState } from 'react';
import loadAndProcessData from './../components/helpers/load-and-process-data';

export default function useMapData() {
  const [countryData, setCountryData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const res = await loadAndProcessData();
      setCountryData(res);
    }

    if (countryData === null) {
      fetchData();
    }
  }, [countryData, setCountryData]);

  return countryData;
}
