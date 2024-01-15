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
      if (dataObj.method === "delete") {
        setLocalThemeData(curThemeData =>
          curThemeData.filter(d => d.theme !== dataObj.theme)
        )
      } else if (dataObj.method === "create") {
        setLocalThemeData(curThemeData => [
          ...curThemeData,
          { theme: dataObj.theme, words: dataObj.words },
        ])
      } else {
        const newThemeData = localThemeData.map(d => {
          if (d.theme !== dataObj.theme) return d

          // EDIT
          console.log("updateLocalThemeData dataObj")
          console.log(dataObj)

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
    console.log("start adding theme here...")
  }

  const createThemeMutation = useMutation({
    mutationFn: createThemeFetch,
    onSuccess: (data, vars) => {
      // updateLocalThemeData({
      //   method: "create",
      //   theme: vars.theme,
      //   words: vars.words,
      // })
      qc.setQueryData(`${authorized}-themes`, curData => {
        console.log("curData")
        console.log(curData)
        return [...curData, { theme: vars.theme, words: vars.words }]
      })
      setShowConfirmationModal(false)
    },
  })

  const deleteThemeMutation = useMutation({
    mutationFn: deleteThemeFetch,
    onSuccess: (data, vars) => {
      updateLocalThemeData({ method: "delete", theme: vars.theme })
      setShowConfirmationModal(false)
    },
  })

  console.log("%c Themes render", "background-color: lightgreen; color: black;")
  console.log("localThemeData")
  console.log(localThemeData)

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
