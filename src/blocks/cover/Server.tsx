import React from 'react'
import { CoverType } from '../../commonTypes/types'

const CoverBlockServer: React.FC<CoverType> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col gap-4 xl:gap-8 max-w-[600px]">
      <h1 className="title">{title}</h1>
      <p className="text font-poppins max-w-[500px]">{subtitle}</p>
    </div>
  )
}

export default CoverBlockServer
