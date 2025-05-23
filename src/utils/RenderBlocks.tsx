import { Page } from '@/payload-types'
import CoverBlockServer from '@/blocks/cover/Server'
import ImageBlockServer from '@/blocks/image/Server'
import RichTextBlockServer from '@/blocks/richtext/Server'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const blockComponents: Record<Page['content']['layout'][number]['blockType'], React.FC<any>> = {
  cover: CoverBlockServer,
  image: ImageBlockServer,
  richtext: RichTextBlockServer,
}

export const RenderBlocks: React.FC<{
  blocks: Page['content']['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index}>
                  <Block {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </>
    )
  }

  return null
}
