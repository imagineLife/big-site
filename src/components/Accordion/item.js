import React, { useState } from "react"

const AccordionItem = ({ title, content, startOpen }) => {
  const [isActive, setIsActive] = useState(startOpen || false)

  return (
    <div className="item" aria-label={title}>
      
      <div className="title" onClick={() => setIsActive(!isActive)}>
      
        <div>{title}</div>
      
        <div className="toggle">{isActive ? "-" : "+"}</div>
      </div>
      
      {isActive && <div className="content">{content}</div>}
    </div>
  )
}

export default AccordionItem
