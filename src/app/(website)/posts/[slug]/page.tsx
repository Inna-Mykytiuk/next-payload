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
      slug: { equals: slug }, // Фільтруємо пост за slug
    },
    limit: 1,
  })

  return result.docs[0] || null
}

interface PostPageProps {
  params: { slug: string }
}

// Використовуємо асинхронне завантаження даних
export default async function PostPage({ params }: PostPageProps) {
  // Чекаємо доступу до params і виконуємо запит
  const { slug } = await params
  if (!slug) {
    throw new Error('Slug not found in params')
  }

  const post = await fetchPost(slug)

  if (!post) {
    return (
      <section className="w-full h-full pt-[100px]">
        <div className="container">
          <p className="text-center text-lg font-bold">Post not found</p>
        </div>
      </section>
    )
  }

  const imageUrl = typeof post.image === 'string' ? post.image : post.image?.url || ''
  const postDate = new Date(post.createdAt).toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <section className="w-full h-full pt-[100px]">
      <div className="container">
        <article className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={post.title}
              width={800}
              height={400}
              className="rounded-lg mb-4"
            />
          )}
          <p className="text-gray-600 mb-2">Author: {post.author}</p>
          <p className="text-gray-500 text-sm mb-6">Published on: {postDate}</p>
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
