import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { cache } from 'react'
import type { Post as PostPage } from '@/payload-types'
import Image from 'next/image'
import RichTextBlockServer from '@/blocks/richtext/Server'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function PostPage({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  if (!post) {
    return (
      <section className="w-full h-full ">
        <div className="container">
          <p className="text-center text-lg font-bold">Post not found</p>
        </div>
      </section>
    )
  }
  const imageUrl = typeof post.image === 'string' ? post.image : post.image?.url || ''

  const postDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <section className="w-full h-full pt-[60px] pb-[80px]">
      <div className="container">
        <article className="mx-auto xl:max-w-[900px]">
          {imageUrl && (
            <div className="flex justify-center w-full h-full xl:w-[900px] xl:h-[500px] rounded-xl overflow-hidden shadow-lg mb-10">
              <Image
                src={imageUrl}
                alt={post.title}
                width={900}
                height={500}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <h2 className="text-2xl md:text-4xl font-bold mb-4">{post.title}</h2>
          <p className="text-gray-600 mb-2">Author: {post.author}</p>
          <p className="text-gray-500 text-sm mb-8">Published on: {postDate}</p>
          <RichTextBlockServer
            content={post.content}
            className="text-lg text-gray-700"
            blockType="richtext"
          />
        </article>
      </div>
    </section>
  )
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
