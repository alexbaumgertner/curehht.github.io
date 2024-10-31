'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'

import { ClientProvider } from '@/components/Apollo'

// Metadata is not supported in client components. Please define it in a server component.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <ClientProvider>{children}</ClientProvider>
    </SessionProvider>
  )
}
