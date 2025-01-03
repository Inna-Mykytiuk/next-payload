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
      slug: {
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
  })

  return (
    pages.docs
      ?.filter((doc) => {
        return doc.slug !== 'index'
      })
      .map((doc) => ({
        slug: doc.slug,
      })) || []
  )
}

export default async function Page({ params }: { params: Promise<{ slug?: string }> }) {
  const { slug = 'index' } = await params

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
          <RenderBlocks blocks={page.layout} />
        </div>
      </div>
    </section>
  )
}
