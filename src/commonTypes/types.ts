import { Media } from '@/payload-types'

export type CoverType = {
  title: string
  subtitle: string
  id?: string | null
  blockName?: string | null
  blockType: 'cover'
}

export type RichTextType = {
  content: {
    root: {
      type: string
      children: {
        type: string
        version: number
        [k: string]: unknown
      }[]
      direction: ('ltr' | 'rtl') | null
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
      indent: number
      version: number
    }
  }
  id?: string | null
  blockName?: string | null
  blockType: 'richtext'
}

export type ImageType = {
  image: string | Media
  id?: string | null
  blockName?: string | null
  blockType: 'image'
}

export type Post = {
  id: string
  slug: string
  image: string | Media
  author: string
  title: string
  createdAt: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any
}
