import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

interface NewsLayoutProps {
  children: React.ReactNode
}

const NewsLayout: React.FC<NewsLayoutProps> = ({ children }) => {
  return (
    <Container>
      <h1>Админка новостей</h1>
      <Row>
        <Col md={8}>{children}</Col>
      </Row>
    </Container>
  )
}

export default NewsLayout
