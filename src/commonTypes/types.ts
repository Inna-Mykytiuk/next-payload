import { Media } from '@/payload-types'

// Тип для Cover блоку
export type CoverType = {
  title: string
  subtitle: string
  id?: string | null
  blockName?: string | null
  blockType: 'cover'
}

// Тип для RichText блоку
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

// Тип для Image блоку
export type ImageType = {
  image: string | Media
  id?: string | null
  blockName?: string | null
  blockType: 'image'
}
