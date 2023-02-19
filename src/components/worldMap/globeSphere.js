import React from 'react';
import { geoPath, geoNaturalEarth1 } from "d3-geo"

export default function GlobeSphere({pathGenerator}) {
  const spherePath = pathGenerator({ type: "Sphere" })

  const props = {
    className: "globeSpherePath",
    d: spherePath,
    opacity: 1,
    fill: "darkblue",
  }
  return <path {...props}></path>
}
