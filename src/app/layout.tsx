import '@/styles/globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body>
        <main className="overflow-hidden flex flex-col min-h-screen">{children}</main>
      </body>
    </html>
  )
}
