import config from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import type { Post as PostType } from '@/payload-types'
import Image from 'next/image'
import RichTextBlockServer from '@/blocks/richtext/Server'
import Link from 'next/link' // Імпортуємо Link для маршрутизації

async function fetchPosts(): Promise<PostType[]> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
  })

  console.log('Fetched posts:', result.docs)

  return result.docs || []
}

export default async function PostsPage() {
  const posts = await fetchPosts()

  if (!posts.length) {
    return (
      <section className="w-full h-full pt-[100px]">
        <div className="container">
          <p className="text-center text-lg font-bold">No posts available</p>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full h-full pt-[100px]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {posts.map((post) => {
            const imageUrl = typeof post.image === 'string' ? post.image : post.image?.url || ''
            const postDate = new Date(post.createdAt).toLocaleDateString('uk-UA', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })

            return (
              <Link
                key={post.id}
                href={`/posts/${post.slug}`} // Додаємо динамічне посилання
                className="border rounded-lg p-4 block hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-bold">{post.title}</h2>
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="rounded-lg my-2"
                  />
                )}
                <p className="text-gray-600">{post.author}</p>
                <p className="text-gray-500 text-sm">{postDate}</p>
                <RichTextBlockServer
                  content={post.content}
                  className="text-sm text-gray-500 mt-2"
                  blockType="richtext"
                />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
