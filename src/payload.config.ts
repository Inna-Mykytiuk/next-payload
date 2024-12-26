// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb' // database-adapter-import
// import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { s3Storage } from '@payloadcms/storage-s3'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Pages } from './collections/Pages'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Перевірки на undefined або встановлення дефолтних значень
const databaseUri = process.env.DATABASE_URI || ''
const payloadSecret = process.env.PAYLOAD_SECRET || ''
const s3Bucket = process.env.S3_BUCKET || ''
const s3AccessKeyId = process.env.S3_ACCESS_KEY_ID || ''
const s3SecretAccessKey = process.env.S3_SECRET_ACCESS_KEY || ''
const s3Region = process.env.S3_REGION || ''
const s3Endpoint = process.env.S3_ENDPOINT || 'http://localhost'

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages, Posts],
  globals: [Header, Footer],
  editor: lexicalEditor(),
  secret: payloadSecret,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // database-adapter-config-start
  db: mongooseAdapter({
    url: databaseUri,
  }),
  // database-adapter-config-end
  sharp,
  plugins: [
    // payloadCloudPlugin(),
    // storage-adapter-placeholder,
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
        },
      },
      bucket: s3Bucket,
      config: {
        credentials: {
          accessKeyId: s3AccessKeyId,
          secretAccessKey: s3SecretAccessKey,
        },
        region: s3Region,
        endpoint: s3Endpoint,
        forcePathStyle: true,
      },
    }),
  ],
})
