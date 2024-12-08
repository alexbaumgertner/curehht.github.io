'use client'

import { SessionProvider } from 'next-auth/react'

import { ClientProvider } from '@/components/Apollo'
import { Footer } from '@/components'

import 'bootstrap/dist/css/bootstrap.min.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body>
        <SessionProvider>
          <ClientProvider>{children}</ClientProvider>
        </SessionProvider>
        <div className="mt-5">
          <Footer />
        </div>
      </body>
    </html>
  )
}
