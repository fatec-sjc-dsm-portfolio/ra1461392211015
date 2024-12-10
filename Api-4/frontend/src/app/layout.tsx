import type { Metadata } from 'next'
import './global.css'

// Components
import GlobalLayout from './globalLayout'

// Fonts
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tecsus Project',
  description: 'Tecsus Project created by NeoCode',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalLayout children={children} />
      </body>
    </html>
  )
}
