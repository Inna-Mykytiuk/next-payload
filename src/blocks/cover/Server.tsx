import React from 'react'
import { CoverType } from 'commonTypes/types'

const CoverBlockServer: React.FC<CoverType> = ({ title, subtitle }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  )
}

export default CoverBlockServer
