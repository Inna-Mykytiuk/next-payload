import React from 'react'

export type CoverBlockProps = {
  title: string
  subtitle: string
  id?: string | null
  blockName?: string | null
  blockType: 'cover'
}
const CoverBlockServer: React.FC<CoverBlockProps> = ({ title, subtitle }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  )
}

export default CoverBlockServer
