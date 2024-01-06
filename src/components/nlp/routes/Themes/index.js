import React, { useContext, useState, useEffect } from "react"
import { useQuery } from "react-query"
import { NlpContext } from "./../../state/Provider"
import ThemesTable from "./Table"
import ConfirmationModal from "./ConfirmationModal"
import Description from "./Description"
import { useSessionStorage } from "../../hooks/useStorage"
import "./themes.scss"

const USER_THEMES_API_URL = email =>
  `${process.env.GATSBY_NLP_API_URL}/api/users/${email}/themes`

function Themes() {
  const { authorized } = useContext(NlpContext)
  const [sessionJwt] = useSessionStorage("nlp-token")
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
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

  const handleModalClose = () => setShowConfirmationModal(false)

  return (
    <section id="theme-editor">
      <h2>Theme Editor</h2>

      {/* 
        Theme action summary
      */}
      <h3>Create, Edit, And Delete Themes</h3>
      <Description />

      {!authorized || (!localThemeData && <p>loading...</p>)}

      {authorized && localThemeData && (
        <>
          <ThemesTable
            themes={localThemeData}
            updateLocalThemeData={updateLocalThemeData}
            editTheme={props => setShowConfirmationModal(props)}
          />

          <ConfirmationModal
            showConfirmationModal={showConfirmationModal}
            setShowConfirmationModal={setShowConfirmationModal}
            handleModalClose={handleModalClose}
          />
        </>
      )}
    </section>
  )
}

export default Themes
