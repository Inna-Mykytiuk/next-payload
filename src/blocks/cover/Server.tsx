import React from 'react'
import { CoverType } from 'commonTypes/types'

const CoverBlockServer: React.FC<CoverType> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col font-bold gap-8 max-w-[700px] leading-tight">
      <h1 className="font-unbound text-[72px]">{title}</h1>
      <p>{subtitle}</p>
    </div>
  )
}

export default CoverBlockServer
