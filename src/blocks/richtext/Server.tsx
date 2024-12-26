import React, { JSX } from 'react'

export type RichTextBlockProps = {
  content: {
    root: {
      children: Array<{
        type: 'text' | 'heading' | 'paragraph' | string
        tag?: string
        text?: string
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        children?: Array<any>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any
      }>
      direction: string
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
      indent: number
      type: string
      version: number
    }
  }
}

const RichTextBlockServer: React.FC<RichTextBlockProps> = ({ content }) => {
  if (!content?.root?.children) {
    console.warn('No content found in richtext block')
    return null
  }

  // console.log('Root children:', content.root.children)

  const renderChildren = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: Array<{ type: string; tag?: string; text?: string; children?: any[] }>,
  ): JSX.Element[] => {
    return children
      .map((child, index) => {
        const { type, tag, text, children: nestedChildren } = child

        if (type === 'text' && text) {
          return <span key={index}>{text}</span>
        }

        if (type === 'heading' && tag) {
          return (
            <h1 key={index} className="font-bold text-xl my-2">
              {nestedChildren ? renderChildren(nestedChildren) : null}
            </h1>
          )
        }

        if (type === 'paragraph') {
          return (
            <p key={index} className="my-4">
              {nestedChildren ? renderChildren(nestedChildren) : null}
            </p>
          )
        }

        if (nestedChildren) {
          return <div key={index}>{renderChildren(nestedChildren)}</div>
        }
        return null
      })
      .filter((element) => element !== null) as JSX.Element[]
  }

  return <div className="richtext">{renderChildren(content.root.children)}</div>
}

export default RichTextBlockServer
