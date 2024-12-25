export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <body>{children}</body>
    </div>
  )
}
