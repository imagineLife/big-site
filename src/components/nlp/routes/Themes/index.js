import React, { useContext, useState } from "react"
import { useQuery } from "react-query"
import { NlpContext } from "./../../state/Provider"
import ThemesTable from "./Table"
import "./themes.scss"

const API_HOST = "http://localhost:3000"
const userThemesApi = email => `${API_HOST}/api/users/${email}/themes`
function Themes() {
  const { authorized } = useContext(NlpContext)
  console.log("%c authorized", "background-color: pink; color: black;")
  console.log(authorized)

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

  return (
    <section id="theme-editor">
      <h2>Theme Editor</h2>
      {!authorized || (!userThemes?.data && <p>loading...</p>)}
      {authorized && userThemes?.data && (
        <ThemesTable themes={userThemes.data} />
      )}
    </section>
  )
}

export default Themes
