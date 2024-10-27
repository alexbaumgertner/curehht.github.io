import { Metadata } from 'next'
import { Menu, Footer } from '@/components'

import 'bootstrap/dist/css/bootstrap.min.css'

export const metadata: Metadata = {
  icons: '/favicon.ico',
  title: 'HHT (Рандю-Ослева-Вебера) болезнь',
  keywords:
    'Болезнь Рандю́ — О́слера (Рандю — Ослера — Ве́бера), синдром Ослера, семейная наследственная телеангиэктазия наследственная геморрагическая телеангиэктазия, геморрагический ангиоматоз',
  description:
    'семейная наследственная телеангиэктазия наследственная геморрагическая телеангиэктазия',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body>
        <div className="columns">
          <div className="columns__col columns__col_left">
            <Menu />
          </div>
          <div className="columns__col columns__col_right">
            <main>{children}</main>
          </div>
        </div>

        <Footer />
      </body>
    </html>
  )
}
