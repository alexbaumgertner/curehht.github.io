import React from 'react'
import { Metadata } from 'next'

import { NextAuthProvider } from './providers'

export const metadata: Metadata = {
  title: 'Административная панель',
  description: 'Административная панель',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}
