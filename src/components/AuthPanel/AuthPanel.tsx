'use client'

import React from 'react'
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import Button from 'react-bootstrap/Button'

import classes from './AuthPanel.module.css'

export const AuthPanel = () => {
  const { data: session, status } = useSession()

  return (
    <div className={classes.component}>
      {status === 'unauthenticated' && (
        <Button onClick={() => signIn()}>Войти</Button>
      )}
      {status === 'loading' && <div className={classes.loader}></div>}
      {status === 'authenticated' && (
        <>
          <p className={classes.title}>Привет, {session?.user?.name}</p>
          <div className={classes.avatarAndMenu}>
            <Link href="/profile">
              <Image
                className={classes.avatar}
                src={session?.user?.image as string}
                alt={session?.user?.name as string}
                width={50}
                height={50}
              />
            </Link>
            <div className={classes.menu}>
              <Link href="/profile" className={classes.linkToProfile}>
                Профиль
              </Link>
              <Button
                className={classes.logout}
                onClick={() => {
                  confirm('Вы уверены, что хотите выйти?') && signOut()
                }}
              >
                Выйти
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
