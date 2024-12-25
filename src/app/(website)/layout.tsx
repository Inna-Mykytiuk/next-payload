import '@/styles/globals.css'

import HeaderServer from '@/blocks/global/Header/Server'
import FooterServer from '@/blocks/global/Footer/Server'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <HeaderServer />
        {children}
        <FooterServer />
      </body>
    </html>
  )
}
