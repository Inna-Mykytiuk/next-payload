import React, { JSX } from 'react'
import { RichTextType } from 'commonTypes/types'

interface RichTextBlockServerProps extends RichTextType {
  className?: string // Додано проп для стилів
}

const RichTextBlockServer: React.FC<RichTextBlockServerProps> = ({ content, className }) => {
  if (!content?.root?.children) {
    console.warn('No content found in richtext block')
    return null
  }

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
          const headingLevels: Record<'h1' | 'h2' | 'h3' | 'h4', string> = {
            h1: 'font-bold text-2xl my-4',
            h2: 'font-semibold text-xl my-3',
            h3: 'font-medium text-lg my-2',
            h4: 'font-medium text-md my-1',
          }

          const headingClass =
            headingLevels[tag as keyof typeof headingLevels] || 'font-bold text-xl my-2'

          return React.createElement(
            tag,
            { key: index, className: headingClass },
            nestedChildren ? renderChildren(nestedChildren) : null,
          )
        }

        if (type === 'paragraph') {
          return (
            <p key={index} className="my-4">
              {nestedChildren ? renderChildren(nestedChildren) : null}
            </p>
          )
        }

        if (type === 'list' && tag) {
          if (tag === 'ul') {
            return (
              <ul key={index} className="list-disc pl-5 my-2">
                {nestedChildren ? renderChildren(nestedChildren) : null}
              </ul>
            )
          }
          if (tag === 'ol') {
            return (
              <ol key={index} className="list-decimal pl-5 my-2">
                {nestedChildren ? renderChildren(nestedChildren) : null}
              </ol>
            )
          }
        }

        if (type === 'list-item') {
          return (
            <li key={index} className="my-1">
              {nestedChildren ? renderChildren(nestedChildren) : null}
            </li>
          )
        }

        if (nestedChildren) {
          return <div key={index}>{renderChildren(nestedChildren)}</div>
        }
        return null
      })
      .filter((element) => element !== null) as JSX.Element[]
  }

  return <div className={className || 'richtext'}>{renderChildren(content.root.children)}</div>
}

export default RichTextBlockServer
