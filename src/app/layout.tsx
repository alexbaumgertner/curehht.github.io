'use client'

import { SessionProvider } from 'next-auth/react'

import { ClientProvider } from '@/components/Apollo'
import { Footer } from '@/components'

import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap'
import { usePathname } from 'next/navigation'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

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
              <Col>
                <ClientProvider>{children}</ClientProvider>
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
