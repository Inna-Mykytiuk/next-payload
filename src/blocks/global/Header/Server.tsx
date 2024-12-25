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
    <header className="bg-blue-300 w-full py-4">
      <div className="container">
        <div className="flex items-center justify-between">
          {logoSrc && (
            <Image
              src={logoSrc}
              alt={logoAlt}
              priority
              className="object-contain w-[120px] h-auto"
              width={120}
              height={50}
            />
          )}

          <div className="flex gap-4">
            {header?.nav?.map((item) => (
              <Link key={item.id} href={item.link || ''} className="">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
