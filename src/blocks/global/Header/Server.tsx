import React from 'react'
import { getPayload } from 'payload'
import config from '../../../payload.config'
import Image from 'next/image'
import Link from 'next/link'

export default async function HeaderServer() {
  const payload = await getPayload({ config })
  const header = await payload.findGlobal({ slug: 'header' })

  const logoSrc = typeof header?.logo === 'string' ? header.logo : header?.logo?.url || ''
  const logoAlt = typeof header?.logo !== 'string' && header?.logo?.alt ? header.logo.alt : 'logo'

  return (
    <header className="bg-blue-300 w-full py-3 shadow-md">
      <div className="container">
        <div className="flex items-center justify-between">
          {logoSrc && (
            <div className="w-[120px] h-[40px]">
              <Image
                src={logoSrc}
                alt={logoAlt}
                priority
                className="object-contain w-full h-full"
                width={120}
                height={40}
              />
            </div>
          )}

          <div className="flex gap-4">
            {header?.nav?.map((item) => (
              <Link
                key={item.id}
                href={item.link || ''}
                className="uppercase font-medium hover:text-white transition-all duration-300 ease-in-out"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
