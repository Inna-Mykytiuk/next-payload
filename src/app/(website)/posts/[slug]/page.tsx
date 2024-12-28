import config from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import type { Post as PostType } from '@/payload-types'
import Image from 'next/image'
import RichTextBlockServer from '@/blocks/richtext/Server'

async function fetchPost(slug: string): Promise<PostType | null> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'posts',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  })

  return result.docs[0] || null
}

interface PostPageProps {
  params: { slug: string }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = params
  if (!slug) {
    throw new Error('Slug not found in params')
  }

  const post = await fetchPost(slug)

  if (!post) {
    return (
      <section className="w-full h-full ">
        <div className="container">
          <p className="text-center text-lg font-bold">Post not found</p>
        </div>
      </section>
    )
  }

  let imageUrl = post.image ? (typeof post.image === 'string' ? post.image : post.image.url) : ''

  if (imageUrl && !imageUrl.startsWith('http')) {
    imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${imageUrl}`
  }
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
          <h1 className="text-2xl md:text-4xl font-bold mb-4">{post.title}</h1>
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
