const sortByWordAlpha = (a, b) => {
  if (typeof a === 'string') {
    if (a < b) { return -1; }
    if (a > b) { return 1; }
  }
  if (a.word < b.word) { return -1; }
  if (a.word > b.word) { return 1; }
};

  export { sortByWordAlpha };