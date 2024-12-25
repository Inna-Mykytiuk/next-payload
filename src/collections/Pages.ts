import { Cover } from '@/blocks/cover/schema'
import { Image } from '@/blocks/image/schema'
import { RichText } from '@/blocks/richtext/schema'
import { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'layout',
      label: 'Layout',
      type: 'blocks',
      blocks: [Cover, RichText, Image],
    },
  ],
}
