'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'

// Metadata is not supported in client components. Please define it in a server component.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SessionProvider>{children}</SessionProvider>
}
