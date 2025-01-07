import type { Metadata } from 'next'
import { generateMeta } from '@/utils/generateMeta'

import config from '@payload-config'
import { getPayload } from 'payload'
import React, { cache } from 'react'
import type { Page as PageType } from '@/payload-types'
import { RenderBlocks } from '@/utils/RenderBlocks'
import { notFound } from 'next/navigation'

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const parsedSlug = decodeURIComponent(slug)

  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    limit: 1,
    where: {
      'content.slug': {
        equals: parsedSlug,
      },
    },
  })

  return result.docs?.[0] || null
})

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    pagination: false,
  })

  return (
    pages.docs
      ?.filter((doc) => doc.content?.slug !== 'home')
      .map((doc) => ({
        slug: doc.content?.slug,
      })) || []
  )
}

export default async function Page({ params }: { params: Promise<{ slug?: string }> }) {
  const { slug = 'home' } = await params

  const page: PageType | null = await queryPageBySlug({
    slug,
  })

  if (!page) {
    return notFound()
  }

  return (
    <section className="w-full h-full py-[40px] xl:pt-[80px]">
      <div className="container relative">
        {/* <div className="absolute left-0 top-[90px] w-full xl:w-[700px] h-[100px] bg-[#93c4fda4]"></div> */}
        <div className="flex flex-col xl:items-center gap-8 xl:gap-0 xl:flex-row justify-between">
          <RenderBlocks blocks={page.content.layout} />
        </div>
      </div>
    </section>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string }>
}): Promise<Metadata> {
  const { slug = 'home' } = await params

  const page = await queryPageBySlug({ slug })

  if (!page || !page.meta) {
    return generateMeta({ meta: {} })
  }

  return generateMeta({ meta: page.meta })
}
