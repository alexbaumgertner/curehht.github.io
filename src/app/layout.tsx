'use client'

import { useEffect, useState } from 'react'
import { gql } from '@apollo/client'
import { SessionProvider } from 'next-auth/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import { Container, Row, Col, Breadcrumb, Nav } from 'react-bootstrap'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { ClientProvider } from '@/components/Apollo'
import { makeClient } from '@/components/Apollo/ClientProvider'
import { Footer } from '@/components'

import 'bootstrap/dist/css/bootstrap.min.css'

const client = makeClient()

const GET_PAGES_SLUG = gql`
  query GetPagesSlug {
    pages {
      slug
      slug_name
    }
  }
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await client.query({ query: GET_PAGES_SLUG })
      setData(data)
    }

    fetchData()
  }, [])

  return (
    <html lang="ru">
      <body>
        <Container>
          <Row>
            <Col>
              <Breadcrumb>
                {pathname.split('/').map((path, index, arr) => {
                  const href = `${arr.slice(0, index + 1).join('/')}`
                  return (
                    <Breadcrumb.Item
                      key={index}
                      active={index === arr.length - 1}
                      href={href}
                    >
                      {path}
                    </Breadcrumb.Item>
                  )
                })}
              </Breadcrumb>
            </Col>
          </Row>
        </Container>
        <SessionProvider>
          <Container>
            <Row>
              <Col md={2}>
                <Nav className="flex-column">
                  <Nav.Item>
                    <Link href="/" passHref legacyBehavior>
                      <Nav.Link>Главная</Nav.Link>
                    </Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link href="/diagnostics" passHref legacyBehavior>
                      <Nav.Link>Диагностика</Nav.Link>
                    </Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link href="/treatment" passHref legacyBehavior>
                      <Nav.Link>Лечение</Nav.Link>
                    </Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link href="/life-style" passHref legacyBehavior>
                      <Nav.Link>Образ жизни</Nav.Link>
                    </Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link href="/news" passHref legacyBehavior>
                      <Nav.Link>Новости</Nav.Link>
                    </Link>
                  </Nav.Item>
                  {data?.pages.map((page) => (
                    <Nav.Item key={page.slug}>
                      <Link href={`/${page.slug}`} passHref legacyBehavior>
                        <Nav.Link>{page.slug_name}</Nav.Link>
                      </Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </Col>
              <Col md={10}>
                <ClientProvider>
                  {children}
                  <SpeedInsights />
                  <Analytics />
                </ClientProvider>
              </Col>
            </Row>
          </Container>
        </SessionProvider>
        <div className="mt-5">
          <Footer />
        </div>
      </body>
    </html>
  )
}
