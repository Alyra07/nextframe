import { access, readdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

const outputDirectory = fileURLToPath(
  new URL('../.output/public/', import.meta.url)
)

// Nur auf einen fertig generierten Build anwenden.
await access(join(outputDirectory, 'index.html'))
await access(join(outputDirectory, 'mein-programm/index.html'))

const files = (await readdir(outputDirectory, { recursive: true }))
  .map(file => file.replaceAll('\\', '/'))

const staticAssets = files.filter(file =>
  (
    file.startsWith('_nuxt/') &&
    /\.(?:js|mjs|css|json|woff2?|ttf|otf|eot|png|svg|jpe?g|webp|avif|gif|ico)$/.test(file)
  ) ||
  (
    /^(?:icons|fonts)\//.test(file) &&
    /\.(?:png|svg|jpe?g|webp|avif|gif|ico|woff2?|ttf|otf|eot)$/.test(file)
  ) ||
  file === 'favicon.ico' ||
  file === 'manifest.webmanifest' ||
  file === '_payload.json'
)

const urls = [
  '/',
  '/mein-programm',
  ...staticAssets.map(file => `/${file}`)
]

await writeFile(
  join(outputDirectory, 'shell-assets.json'),
  JSON.stringify([...new Set(urls)].sort(), null, 2)
)

console.log('App-Shell-Liste für den Service Worker erzeugt.')