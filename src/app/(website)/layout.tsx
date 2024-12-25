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
      <body className="min-h-screen flex flex-col">
        <HeaderServer />
        <main className="flex-grow">{children}</main>
        <FooterServer />
      </body>
    </html>
  )
}
