import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import Image from 'next/image'
import configPromise from '@payload-config'
import type { Post as PostType } from '@/payload-types'

// import { Metadata } from 'next'

export default async function PostsPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
  })

  return (
    <section className="w-full h-full pt-[60px] pb-[80px]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {posts.map((post: PostType) => {
            const imageUrl =
              typeof post.content.image === 'string'
                ? post.content?.image
                : post.content?.image?.url || ''
            const postDate = new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
            const postTime = new Date(post.createdAt).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })

            return (
              <Link
                key={post.id}
                href={`/posts/${post.content.slug}`}
                className="border rounded-lg p-4 flex flex-col hover:shadow-lg transition-shadow w-full h-full"
              >
                {imageUrl && (
                  <div className="w-full h-auto rounded-xl overflow-hidden mb-4">
                    <Image
                      src={imageUrl}
                      alt={post.content.title}
                      width={400}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <div className="flex flex-col flex-grow">
                  <h2 className="text-xl font-bold">{post.content.title}</h2>
                  <p className="text-gray-600">{post.content.author}</p>
                  <p className="text-gray-500 text-sm mt-auto">
                    {postDate} at {postTime}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
