import { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'nav',
      label: 'Navigation',
      type: 'array',
      fields: [
        {
          name: 'label',
          label: 'Label',
          type: 'text',
        },
        {
          name: 'link',
          label: 'Link',
          type: 'text',
        },
      ],
      minRows: 1,
    },
    {
      name: 'copyright',
      label: 'Copyright',
      type: 'text',
      required: true,
    },
  ],
}
