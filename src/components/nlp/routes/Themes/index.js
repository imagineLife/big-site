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

  console.log("%c Themes route", "background-color: pink; color: black;")
  console.log("showConfirmationModal")
  console.log(showConfirmationModal)

  const [localThemeData, setLocalThemeData] = useState(userThemes?.data)
  // TODO: use useQueryClient here
  // https://tanstack.com/query/v4/docs/react/guides/updates-from-mutation-responses
  // store a copy of the theme data from react-query
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

  const handleModalClose = theme => setShowConfirmationModal(false)

  const deleteTheme = theme => {
    console.log("will delete theme here...", theme)
  }

  const createTheme = theme => {
    console.log("will create theme here...", showConfirmationModal?.themeAction)
    console.log("theme")
    console.log(theme)
  }

  const editTheme = theme => {
    console.log("will EDIT theme here...", theme)
  }

  const startAddingTheme = () => {
    setShowConfirmationModal({ themeAction: "Create" })
    console.log("start adding theme here...")
  }

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
            startAddingTheme={startAddingTheme}
          />

          <ConfirmationModal
            showConfirmationModal={showConfirmationModal}
            setShowConfirmationModal={setShowConfirmationModal}
            handleModalClose={handleModalClose}
            confirmFunction={theme => {
              if (showConfirmationModal?.themeAction === "Edit") {
                editTheme(theme)
              } else if (showConfirmationModal?.themeAction === "Create") {
                createTheme(theme)
              } else {
                deleteTheme(theme)
              }
            }}
          />
        </>
      )}
    </section>
  )
}

export default Themes
