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

      {/* 
        Theme action summary
      */}
      <h3>Create, Edit, And Delete Themes</h3>
      <i>
        A "theme" here is a word representing a "topic" within the text. Themes
        associate with keywords. When the assocaited keyword(s) appear in text,
        the theme will be associated with that text. The theme word, itself, may
        not appear in the text.
      </i>
      <ul>
        <li>
          <b>Create a new theme</b>: select the "+" that appears when hovering
          over the "theme" header.
        </li>
        <li>
          <b>Edit a theme word</b>: select the pencil icon that appears when
          hovering over the theme word.
        </li>
        <li>
          <b>Delete a theme</b>: select the trashcan icon that appears when
          hovering over the theme word.
        </li>
      </ul>

      {/* 
        Theme keyword action summary
      */}
      <h3>Create, Edit, and Delete Theme Keywords</h3>
      <i>
        A theme "keyword" here is a word that (sh/c)ould exist in the text. Any
        time the keyword appears in the text, the theme associated with the
        keyword will be associated with the text.
      </i>
      <ul>
        <li>
          <b>Create a theme keyword</b>: select the "+" that appears when
          hovering over the "keywords" cell assocaited with a theme.
        </li>
        <li>
          <b>Edit a theme keyword</b>: select the "pill" showing the keyword you
          want to edit. Input the edited keyword, and select "save".
        </li>
        <li>
          <b>Delete a theme keyword</b>: select the "pill" showing the keyword
          you want to delete. Select "delete".
        </li>
      </ul>
      <i></i>
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
