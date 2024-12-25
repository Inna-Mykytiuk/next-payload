import { Block } from 'payload'

export const RichText: Block = {
  slug: 'richtext',
  fields: [
    {
      name: 'content',
      label: 'Content',
      type: 'richText',
      required: true,
    },
  ],
}
