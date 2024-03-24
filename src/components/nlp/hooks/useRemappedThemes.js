export default function useRemappedThemes({ themes }) {
  const remappedThemes = {}
  themes.forEach(themeObj => {
    themeObj.words.forEach(themeWord => {
      remappedThemes[themeWord.toLowerCase()] = themeObj.theme
    })
  })
  return remappedThemes
}
