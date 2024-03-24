import React from "react"

export default function LabelsDescription() {
  return (
    <>
      <i>
        A "label" here is a word representing a "topic" within the text. Labels
        associate with keywords. When the assocaited keyword(s) appear in text,
        the label will be associated with that text. The label word, itself, is
        not required to appear in the text in order for the label to be
        associated with the text.
      </i>
      <ul>
        <li>
          <b>Create a new label</b>: select the "+" that appears when hovering
          over the "label" header.
        </li>
        <li>
          <b>Edit a label word</b>: select the pencil icon that appears when
          hovering over the label word.
        </li>
        <li>
          <b>Delete a label</b>: select the trashcan icon that appears when
          hovering over the label word.
        </li>
      </ul>

      {/* 
        Label keyword action summary
      */}
      <h3>Label Keywords</h3>
      <i>
        A label "keyword" here is a word that (sh/c)ould exist in the text. Any
        time the keyword appears in the text, the label associated with the
        keyword will be associated with the text.
      </i>
      <ul>
        <li>
          <b>Create a label keyword</b>: select the "+" that appears when
          hovering over the "keywords" cell assocaited with a label.
        </li>
        <li>
          <b>Edit a label keyword</b>: select the "pill" showing the keyword you
          want to edit. Input the edited keyword, and select "save".
        </li>
        <li>
          <b>Delete a label keyword</b>: select the "pill" showing the keyword
          you want to delete. Select "delete".
        </li>
      </ul>
    </>
  )
}
