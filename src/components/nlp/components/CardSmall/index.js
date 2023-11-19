import React from "react"
import { Col, Card, Row } from "react-bootstrap"
import "./index.scss"

export default function CardSmall({
  title,
  value,
  image,
  imageColor,
  footerText,
  footerImage,
}) {
  // const bigImageClass = !image ? null : imageClassFromString(image)
  // const footerImageClass = !footerImage
  //   ? null
  //   : imageClassFromString(footerImage)
  return (
    <Col lg="3" sm="6">
      <Card className="card-stats">
        <Card.Title as="h4">{value}</Card.Title>
        <Card.Text style={{ textAlign: "right" }}>{title}</Card.Text>
      </Card>
    </Col>
  )
}
