import React from 'react'
import Image from 'next/image'
import { Media } from '@/payload-types'

export type ImageBlockProps = {
  image: string | Media
  id?: string | null
  blockName?: string | null
  blockType: 'image'
}

const ImageBlockServer: React.FC<ImageBlockProps> = ({ image }) => {
  const imageUrl = typeof image === 'string' ? image : image?.url || ''
  const altText = typeof image === 'string' ? 'Image' : image?.alt || 'Image'

  return (
    <div className="flex justify-center">
      <Image src={imageUrl} alt={altText} width={500} height={500} />
    </div>
  )
}

export default ImageBlockServer
