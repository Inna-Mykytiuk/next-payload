import React from 'react'
import Image from 'next/image'
import { ImageType } from 'commonTypes/types'

const ImageBlockServer: React.FC<ImageType> = ({ image }) => {
  const imageUrl = typeof image === 'string' ? image : image?.url || ''
  const altText = typeof image === 'string' ? 'Image' : image?.alt || 'Image'

  return (
    <div className="flex justify-center">
      <Image src={imageUrl} alt={altText} width={500} height={500} />
    </div>
  )
}

export default ImageBlockServer
