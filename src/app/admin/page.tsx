import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { AuthPanel, AddNewsArticle } from '@/components'

const AdminPage: React.FC = () => {
  return (
    <Container>
      <h1>Admin Page</h1>

      <Row>
        <Col>
          <AuthPanel />
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Редактировать новости</h2>
          <section>
            <h3>Добавить новость</h3>
            <AddNewsArticle author="" />
          </section>

          <section>
            <h3>Редактировать новость</h3>
            {/* Add logic to edit news articles */}
          </section>
        </Col>
      </Row>
    </Container>
  )
}

export default AdminPage
