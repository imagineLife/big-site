import React, { useContext, useState, useEffect, useCallback } from "react"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { NlpContext } from "./../../state/Provider"
import ThemesTable from "./Table"
import ConfirmationModal from "./ConfirmationModal"
import Description from "./Description"
import { useSessionStorage } from "../../hooks/useStorage"
import createThemeFetch from "../../fetches/createTheme"
import deleteThemeFetch from "../../fetches/deleteTheme"

import "./themes.scss"

const USER_THEMES_API_URL = email =>
  `${process.env.GATSBY_NLP_API_URL}/api/users/${email}/themes`

function Themes() {
  const qc = useQueryClient()
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

  // TODO: use useQueryClient here
  // https://tanstack.com/query/v4/docs/react/guides/updates-from-mutation-responses
  // store a copy of the theme data from react-query
  useEffect(() => {
    setLocalThemeData(userThemes.data)
  }, [userThemes.data])

  const updateLocalThemeData = useCallback(
    dataObj => {
      if (dataObj.method === "edit-theme") {
        qc.setQueryData(`${authorized}-themes`, curData => {
          return curData.map(t => {
            if (t.theme !== dataObj.theme) {
              return t
            } else {
              let thisObj = t
              thisObj.theme = dataObj.newTheme
              return thisObj
            }
          })
        })
      } else if (dataObj?.type === "edit-theme-word") {
        qc.setQueryData(`${authorized}-themes`, curData => {
          return curData.map(t => {
            if (t.theme !== dataObj.theme) return t
            t.words = t.words.map(w => {
              if (w !== dataObj.originalWord) return w
              return dataObj.word
            })
            return t
          })
        })
      } else if (dataObj?.type === "delete-value") {
        qc.setQueryData(`${authorized}-themes`, curData => {
          return curData.map(t => {
            if (t.theme !== dataObj.theme) return t
            t.words = t.words
              .map(w => {
                if (w !== dataObj.originalWord) return w
                return
              })
              .filter(d => d)
            return t
          })
        })
      } else {
        // update theme word
        const newThemeData = localThemeData.map(d => {
          if (d.theme !== dataObj.theme) return d
          let localWords = d.words
          d.words = []
          for (let i = 0; i < localWords.length; i++) {
            const thisWord = localWords[i]
            // "do nothing"
            if (thisWord !== dataObj.originalWord) {
              d.words.push(thisWord)
            } else {
              // store "edited" word in words arr
              if (!Boolean(dataObj?.method === "delete-value")) {
                d.words.push(dataObj.word)
              }
            }
          }
          return d
        })

        setLocalThemeData(newThemeData)
      }
    },
    [localThemeData, setLocalThemeData]
  )

  const handleModalClose = theme => setShowConfirmationModal(false)

  const deleteTheme = theme => {
    deleteThemeMutation.mutate({
      email: authorized,
      theme: theme,
      jwt: sessionJwt,
    })
  }

  const createTheme = obj => {
    createThemeMutation.mutate({
      email: authorized,
      jwt: sessionJwt,
      theme: obj.theme,
      words: obj.keywordList,
    })
  }

  const editTheme = theme => {
    console.log("will EDIT theme here...", theme)
  }

  const startAddingTheme = () => {
    setShowConfirmationModal({ themeAction: "Create" })
  }

  const createThemeMutation = useMutation({
    mutationFn: createThemeFetch,
    onSuccess: (data, vars) => {
      qc.setQueryData(`${authorized}-themes`, curData => {
        return [...curData, { theme: vars.theme, words: vars.words }].sort(
          (a, b) => {
            if (a.theme < b.theme) return -1
            return 1
          }
        )
      })
      setShowConfirmationModal(false)
    },
  })

  const deleteThemeMutation = useMutation({
    mutationFn: deleteThemeFetch,
    onSuccess: (data, vars) => {
      qc.setQueryData(`${authorized}-themes`, curData => {
        return curData.filter(d => d.theme !== vars.theme)
      })
      setShowConfirmationModal(false)
    },
  })

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
            confirmFunction={params => {
              if (showConfirmationModal?.themeAction === "Edit") {
                editTheme(params)
              } else if (showConfirmationModal?.themeAction === "Create") {
                createTheme(params)
              } else {
                deleteTheme(params)
              }
            }}
          />
        </>
      )}
    </section>
  )
}

export default Themes
