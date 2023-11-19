import React from "react"

import Card from "../Card"

export default function Scalar({ value, title, children, className }) {
  let classString = `scalar`
  if (className) {
    classString = `scalar ${className}`
  }
  return (
    <Card title={title} content={value} className={classString}>
      {children}
    </Card>
  )
}
