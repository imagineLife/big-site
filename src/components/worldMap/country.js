import React, { useState } from 'react';
import './country.css'

function colorVal(d) {
  return d.properties.economy
}

export default function Country({ d, idx, pathGenerator, colorScale }) {
  const props = {
    className: "countryPath",
    d: pathGenerator(d),
    fill: colorScale(colorVal(d)),
    key: `${d.id}-${d.properties.abbrev}-${idx}`,
  }
  return <path {...props} />
}