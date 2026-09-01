/**
 * Generates the platform app icons from the approved 1024px duoOffice PNG.
 * The source image is never redrawn: Chromium only performs deterministic
 * downscaling, then iconutil and the ICO container package those pixels.
 */

import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const source = join(root, 'apps/shell/src/renderer/src/assets/app-icon.png')
const outDir = join(root, 'apps/shell/build')
const linuxDir = join(outDir, 'icons')
const dataUrl = `data:image/png;base64,${readFileSync(source).toString('base64')}`

const MAC_ENTRIES = [
  ['icon_16x16.png', 16],
  ['icon_16x16@2x.png', 32],
  ['icon_32x32.png', 32],
  ['icon_32x32@2x.png', 64],
  ['icon_128x128.png', 128],
  ['icon_128x128@2x.png', 256],
  ['icon_256x256.png', 256],
  ['icon_256x256@2x.png', 512],
  ['icon_512x512.png', 512],
  ['icon_512x512@2x.png', 1024],
]
const WIN_SIZES = [16, 24, 32, 48, 64, 128, 256]
const LINUX_SIZES = [16, 32, 48, 64, 128, 256, 512, 1024]

function buildIco(entries) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(entries.length, 4)
  const directory = Buffer.alloc(16 * entries.length)
  let offset = header.length + directory.length
  entries.forEach(({ size, png }, index) => {
    const start = index * 16
    directory.writeUInt8(size >= 256 ? 0 : size, start)
    directory.writeUInt8(size >= 256 ? 0 : size, start + 1)
    directory.writeUInt8(0, start + 2)
    directory.writeUInt8(0, start + 3)
    directory.writeUInt16LE(1, start + 4)
    directory.writeUInt16LE(32, start + 6)
    directory.writeUInt32LE(png.length, start + 8)
    directory.writeUInt32LE(offset, start + 12)
    offset += png.length
  })
  return Buffer.concat([header, directory, ...entries.map(({ png }) => png)])
}

async function renderPng(page, size) {
  await page.setViewportSize({ width: size, height: size })
  await page.setContent(
    `<body style="margin:0"><img src="${dataUrl}" width="${size}" height="${size}"></body>`,
  )
  return page.screenshot({ omitBackground: false })
}

const browser = await chromium.launch({ channel: 'chrome', headless: true })
const page = await browser.newPage({ deviceScaleFactor: 1 })
const temporary = mkdtempSync(join(tmpdir(), 'duooffice-app-icon-'))

try {
  const rendered = new Map()
  for (const size of new Set([
    ...MAC_ENTRIES.map(([, size]) => size),
    ...WIN_SIZES,
    ...LINUX_SIZES,
  ])) {
    rendered.set(size, await renderPng(page, size))
  }

  const iconset = join(temporary, 'duooffice.iconset')
  mkdirSync(iconset, { recursive: true })
  for (const [name, size] of MAC_ENTRIES) writeFileSync(join(iconset, name), rendered.get(size))
  execFileSync('iconutil', ['-c', 'icns', iconset, '-o', join(outDir, 'icon.icns')])

  writeFileSync(
    join(outDir, 'icon.ico'),
    buildIco(WIN_SIZES.map((size) => ({ size, png: rendered.get(size) }))),
  )

  mkdirSync(linuxDir, { recursive: true })
  for (const size of LINUX_SIZES)
    writeFileSync(join(linuxDir, `${size}x${size}.png`), rendered.get(size))
  writeFileSync(join(outDir, 'icon.png'), rendered.get(1024))
  writeFileSync(join(outDir, 'icon-mac.png'), rendered.get(1024))
  console.log('Generated duoOffice app icons for macOS, Windows, and Linux.')
} finally {
  rmSync(temporary, { recursive: true, force: true })
  await browser.close()
}
