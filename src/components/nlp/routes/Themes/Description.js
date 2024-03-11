import React from "react"

export default function ThemesDescription() {
  return (
    <>
      <i>
        A "theme" here is a word representing a "topic" within the text. Themes
        associate with keywords. When the assocaited keyword(s) appear in text,
        the theme will be associated with that text. The theme word, itself, is
        not required to appear in the text in order for the theme to be
        associated with the text.
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
      <h3>Theme Keywords</h3>
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
    </>
  )
}
