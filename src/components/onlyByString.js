function onlyWithString(str) {
  return function onlyThese({
    page: {
      overview: { slug },
    },
  }) {
    return slug.includes(str)
  }
}

function onlyWithoutString(str) {
  return function onlyThese({
    page: {
      overview: { slug },
    },
  }) {
    return !slug.includes(str)
  }
}

export { onlyWithString, onlyWithoutString }
