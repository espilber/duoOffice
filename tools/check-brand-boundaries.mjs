import { createHash } from 'node:crypto'
import { readdir, readFile } from 'node:fs/promises'
import { extname, join, relative } from 'node:path'

const root = process.cwd()
const codeExtensions = new Set([
  '.cjs',
  '.css',
  '.html',
  '.js',
  '.jsx',
  '.json',
  '.mjs',
  '.py',
  '.rs',
  '.ts',
  '.tsx',
  '.yaml',
  '.yml',
])
const skippedDirectories = new Set([
  '__tests__',
  'dist',
  'fixtures',
  'node_modules',
  'out',
  'release',
  'target',
  'tests',
])
const files = new Set([
  'package.json',
  'package-lock.json',
  'apps/shell/electron-builder.cjs',
  'apps/shell/package.json',
  '.github/ISSUE_TEMPLATE/config.yml',
])

async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (skippedDirectories.has(entry.name)) continue
    const path = join(directory, entry.name)
    if (entry.isDirectory()) await collect(path)
    else if (codeExtensions.has(extname(entry.name))) files.add(relative(root, path))
  }
}

await collect(join(root, 'apps'))
await collect(join(root, 'packages'))

const forbidden = [
  /genoffice/i,
  /duoOffice\s+(?:account|cloud|sign-in)/i,
  /(?:account|login|loggedIn)duoOffice/i,
]
const violations = []
for (const file of files) {
  const content = await readFile(join(root, file), 'utf8')
  for (const [index, line] of content.split('\n').entries()) {
    if (forbidden.some((pattern) => pattern.test(line))) {
      violations.push(`${file}:${index + 1}: ${line.trim()}`)
    }
  }
  if (/genoffice/i.test(file)) violations.push(`${file}: inherited brand in distributable filename`)
}

const requiredText = new Map([
  [
    'apps/shell/electron-builder.cjs',
    ["appId: 'com.duooffice.app'", "productName: 'duoOffice'", "executableName: 'duooffice'"],
  ],
  ['apps/shell/package.json', ['"productName": "duoOffice"', '"desktopName": "duooffice.desktop"']],
  ['apps/shell/src/renderer/src/Home.tsx', ['./assets/duooffice-logo.svg']],
  [
    'apps/shell/src/main/splash-window.ts',
    ['contextIsolation: true', 'nodeIntegration: false', 'sandbox: true'],
  ],
])
for (const [file, fragments] of requiredText) {
  const content = await readFile(join(root, file), 'utf8')
  for (const fragment of fragments) {
    if (!content.includes(fragment))
      violations.push(`${file}: missing required identity boundary: ${fragment}`)
  }
}

const approvedAssets = new Map([
  [
    'apps/shell/src/renderer/src/assets/app-icon.png',
    'eec5bae9e705e75527f245896fcd821cf8650ff085d99b9de9cd44559270fd51',
  ],
  [
    'apps/shell/src/renderer/src/assets/duooffice-logo.svg',
    'c38467d5d6b69acf8b55f9ffb554698e715dcfb51fe5c48576e4a86e02eae062',
  ],
])
for (const [file, expected] of approvedAssets) {
  const digest = createHash('sha256')
    .update(await readFile(join(root, file)))
    .digest('hex')
  if (digest !== expected) violations.push(`${file}: approved visual asset was modified`)
}

if (violations.length) {
  console.error('Brand boundary violations found:')
  console.error(violations.join('\n'))
  process.exitCode = 1
} else {
  console.log(`Brand boundary audit passed (${files.size} distributable files checked).`)
}
