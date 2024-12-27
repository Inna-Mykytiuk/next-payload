import React from 'react'
import { CoverType } from 'commonTypes/types'

const CoverBlockServer: React.FC<CoverType> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col font-bold gap-4 xl:gap-8 max-w-[600px] leading-tight">
      <h1 className="font-unbound text-[32px] md:text-[48px] lg:text-[72px]">{title}</h1>
      <p className="text-lg font-poppins font-normal max-w-[500px]">{subtitle}</p>
    </div>
  )
}

export default CoverBlockServer
