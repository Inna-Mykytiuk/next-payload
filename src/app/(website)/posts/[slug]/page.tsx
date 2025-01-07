import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { cache } from 'react'
import type { Post as PostPage } from '@/payload-types'
import Image from 'next/image'
import RichTextBlockServer from '@/blocks/richtext/Server'
import { generateMeta } from '@/utils/generateMeta' // Імпортуємо функцію для генерації метаданих
import type { Metadata } from 'next' // Імпортуємо тип Metadata

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const post = await queryPostBySlug({ slug })

  if (!post || !post.meta) {
    return generateMeta({ meta: {} })
  }

  return generateMeta({ meta: post.meta })
}

// Функція для генерації статичних параметрів
export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
  })

  // Повертаємо масив параметрів для статичної генерації
  const params = posts.docs.map((post) => {
    return { slug: post.content.slug }
  })

  return params
}

// Тип для параметрів сторінки
type Args = {
  params: {
    slug: string
  }
}

// Основна компонента сторінки поста
export default async function PostPage({ params }: Args) {
  const { slug } = await params
  const post = await queryPostBySlug({ slug })

  // Якщо пост не знайдено, повертаємо повідомлення про помилку
  if (!post) {
    return (
      <section className="w-full h-full ">
        <div className="container">
          <p className="text-center text-lg font-bold">Post not found</p>
        </div>
      </section>
    )
  }

  // Отримуємо URL зображення
  const imageUrl =
    typeof post.content.image === 'string' ? post.content.image : post.content.image?.url || ''

  // Форматуємо дату публікації
  const postDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Повертаємо розмітку сторінки поста
  return (
    <section className="w-full h-full pt-[60px] pb-[80px]">
      <div className="container">
        <article className="mx-auto xl:max-w-[900px]">
          {imageUrl && (
            <div className="flex justify-center w-full h-full xl:w-[900px] xl:h-[350px] rounded-xl overflow-hidden shadow-lg mb-10">
              <Image
                src={imageUrl}
                alt={post.content.title}
                width={900}
                height={350}
                className="object-cover  w-full h-full"
              />
            </div>
          )}
          <h2 className="text-2xl md:text-4xl font-bold mb-4">{post.content.title}</h2>
          <p className="text-gray-600 mb-2">Author: {post.content.author}</p>
          <p className="text-gray-500 text-sm mb-8">Published on: {postDate}</p>
          <RichTextBlockServer
            content={post.content.content}
            className="text-lg text-gray-700"
            blockType="richtext"
          />
        </article>
      </div>
    </section>
  )
}

// Функція для отримання поста за slug
const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    limit: 1,
    pagination: false,
    where: {
      'content.slug': {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
