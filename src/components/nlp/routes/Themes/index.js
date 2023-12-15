import React, { useContext, useState } from "react"
import { useQuery } from "react-query"
import { NlpContext } from "./../../state/Provider"

function Themes() {
  const { authorized } = useContext(NlpContext)

  return (
    <section id="theme-editor">
      <h2>Theme Editor</h2>
    </section>
  )
}

export default Themes
