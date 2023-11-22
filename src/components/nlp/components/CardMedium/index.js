import React from "react"
import { Col, Card, Row } from "react-bootstrap"
import "./index.scss"

export default function CardMedium({
  title,
  value,
  image,
  imageColor,
  footerText,
  footerImage,
  children,
}) {
  // const bigImageClass = !image ? null : imageClassFromString(image)
  // const footerImageClass = !footerImage
  //   ? null
  //   : imageClassFromString(footerImage)
  return (
    <Col lg="6" sm="12">
      <Card className="card-stats">
        <Card.Title as="h4">{title}</Card.Title>
        {/* {children && <Card.Body>{children}</Card.Body>} */}
        {children}
      </Card>
    </Col>
  )
}
