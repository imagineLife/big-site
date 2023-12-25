import React, { useContext, useState, useEffect } from "react"
import { useQuery } from "react-query"
import { NlpContext } from "./../../state/Provider"
import ThemesTable from "./Table"
import "./themes.scss"

const API_HOST = "http://localhost:3000"
const userThemesApi = email => `${API_HOST}/api/users/${email}/themes`
function Themes() {
  const { authorized } = useContext(NlpContext)
  const userThemes = useQuery(
    `${authorized}-themes`,
    () =>
      fetch(userThemesApi(authorized), {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }).then(d => d.json()),
    {
      enabled: Boolean(authorized),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
      retry: false,
    }
  )

  const [localThemeData, setLocalThemeData] = useState(userThemes?.data)
  useEffect(() => {
    setLocalThemeData(userThemes.data)
  }, [userThemes.data])

  const updateLocalThemeData = dataObj => {
    const newThemeData = localThemeData.map(d => {
      // EDIT
      if (d.theme !== dataObj.theme) return d
      d.words = d.words.map(w => {
        if (w !== dataObj.originalWord) return w
        return dataObj.word
      })
      return d
    })

    setLocalThemeData(newThemeData)
  }

  return (
    <section id="theme-editor">
      <h2>Theme Editor</h2>
      {!authorized || (!localThemeData && <p>loading...</p>)}
      {authorized && localThemeData && (
        <ThemesTable
          themes={localThemeData}
          updateLocalThemeData={updateLocalThemeData}
        />
      )}
    </section>
  )
}

export default Themes
