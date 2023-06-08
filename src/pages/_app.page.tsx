import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

import { Roboto } from 'next/font/google'
import { globalStyles } from '../styles/global'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })

globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <main className={roboto.className}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </main>
  )
}
