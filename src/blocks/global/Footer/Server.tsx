import React from 'react'
import { getPayload } from 'payload'
import config from '../../../payload.config'
import Image from 'next/image'
import Link from 'next/link'

export default async function FooterServer() {
  const payload = await getPayload({ config })
  const footer = await payload.findGlobal({ slug: 'footer' })

  const logoSrc = typeof footer?.logo === 'string' ? footer.logo : footer?.logo?.url || ''
  const logoAlt = typeof footer?.logo !== 'string' && footer?.logo?.alt ? footer.logo.alt : 'logo'

  return (
    <footer className="bg-blue-300 w-full py-4 mt-auto">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col items-center md:flex-row gap-4 md:gap-0 mb-4 md:mb-0 justify-between w-full">
            <p className="text-center md:text-left">{footer?.copyright}</p>

            <div className="flex  gap-4">
              {footer?.nav?.map((item) => (
                <Link key={item.id} href={item.link || ''} className="">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

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
        </div>
      </div>
    </footer>
  )
}
