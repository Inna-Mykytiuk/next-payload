import React from 'react'
import Image from 'next/image'
import { ImageType } from 'commonTypes/types'

const ImageBlockServer: React.FC<ImageType> = ({ image }) => {
  const imageUrl = typeof image === 'string' ? image : image?.url || ''
  const altText = typeof image === 'string' ? 'Image' : image?.alt || 'Image'

  return (
    <div className="flex justify-center w-[700px] h-[500px] rounded-xl overflow-hidden">
      <Image
        src={imageUrl}
        alt={altText}
        width={700}
        height={500}
        className="object-cover w-full h-full"
      />
    </div>
  )
}

export default ImageBlockServer
