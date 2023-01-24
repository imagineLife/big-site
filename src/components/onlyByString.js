function onlyByString(str) {
  return function onlyThese({
    page: {
      overview: { slug },
    },
  }) {
    return slug.includes(str)
  }
}

export default onlyByString