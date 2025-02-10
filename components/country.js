import React, { memo } from 'react';
// import './country.css'

function colorVal(d) {
  return d.properties.economy;
}

function titleVal(d) {
  return `${d.properties.name}: ${d.properties.economy}`;
}

export default memo(function Country({
  d,
  idx,
  pathGenerator,
  colorScale,
  selectedClassification,
}) {
  const opacity =
    selectedClassification == null ||
    d.properties.economy == selectedClassification
      ? 0.8
      : 0.25;

  const props = {
    className: 'countryPath',
    d: pathGenerator(d),
    fill: colorScale(colorVal(d)),
    key: `${d.id}-${d.properties.abbrev}-${idx}`,
    opacity,
  };
  return (
    <path {...props}>
      <title>{titleVal(d)}</title>
    </path>
  );
});
