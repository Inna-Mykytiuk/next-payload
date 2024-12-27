import React, { JSX } from 'react'
import { RichTextType } from '../../commonTypes/types'

interface RichTextBlockServerProps extends RichTextType {
  className?: string
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
          // Повертаємо текст напряму без обгортки в <span>
          return <React.Fragment key={index}>{text}</React.Fragment>
        }

        if (type === 'heading' && tag) {
          const headingLevels: Record<'h1' | 'h2' | 'h3' | 'h4', string> = {
            h1: 'title',
            h2: 'font-semibold text-xl',
            h3: 'font-medium text-lg mt-6',
            h4: 'font-medium text-md mt-6',
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
            <p key={index} className="text font-poppins mt-4">
              {nestedChildren ? renderChildren(nestedChildren) : null}
            </p>
          )
        }

        if (type === 'list' && tag) {
          if (tag === 'ul') {
            return (
              <ul key={index} className="pl-5 mt-4">
                {nestedChildren
                  ? renderChildren(nestedChildren.filter((child) => child.type === 'list-item'))
                  : null}
              </ul>
            )
          }
          if (tag === 'ol') {
            return (
              <ol key={index} className="list-decimal pl-5 mt-4">
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
