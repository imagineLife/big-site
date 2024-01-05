import React, { useContext, useState, useEffect } from "react"
import { useQuery } from "react-query"
import { NlpContext } from "./../../state/Provider"
import ThemesTable from "./Table"
import { useSessionStorage } from "../../hooks/useStorage"
import "./themes.scss"

const USER_THEMES_API_URL = email =>
  `${process.env.GATSBY_NLP_API_URL}/api/users/${email}/themes`

function Themes() {
  const { authorized } = useContext(NlpContext)
  const [sessionJwt] = useSessionStorage("nlp-token")
  const userThemes = useQuery(
    `${authorized}-themes`,
    () =>
      fetch(USER_THEMES_API_URL(authorized), {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionJwt}`,
        },
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
      let localWords = d.words
      d.words = []
      for (let i = 0; i < localWords.length; i++) {
        const thisWord = localWords[i]
        if (thisWord !== dataObj.originalWord) {
          d.words.push(thisWord)
        } else {
          // DELETE
          if (!Boolean(dataObj?.method === "delete")) {
            d.words.push(dataObj.word)
          }
        }
      }
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
