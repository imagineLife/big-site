import React, { Suspense, lazy } from 'react';
import useMapData from './../../../hooks/useMapData';
import useColorData from './../../../hooks/useColorData';
const Map = lazy(() => import('./../../../components/map'));

function PageWrapper({ children }) {
  return (
    <main style={{ backgroundColor: 'black', maxWidth: 'unset', margin: 0 }}>
      {!children && <span>loading...</span>}
      {children && children}
    </main>
  );
}

export default function WorldMap() {
  const countryData = useMapData();
  const colorScale = useColorData(countryData);

  return (
    <PageWrapper>
      {countryData && (
        <Suspense fallback={<span />}>
          {/* Map includes a Legend, SvgWrapper, GlobeSphere (bg), and Countries */}
          <Map countries={countryData} colorScale={colorScale} />
        </Suspense>
      )}
    </PageWrapper>
  );
}
