import { readdir, readFile } from 'node:fs/promises'
import { extname, join, relative } from 'node:path'

const root = process.cwd()
const forbidden = /genspark|@genspark|genspark\.ai|\bgsk\b/i
const sourceExtensions = new Set(['.cjs', '.css', '.html', '.js', '.jsx', '.mjs', '.ts', '.tsx'])
const files = [
  'package.json',
  'package-lock.json',
  'apps/shell/electron-builder.cjs',
  '.github/ISSUE_TEMPLATE/config.yml',
]

async function collectSources(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'tests') continue
      await collectSources(path)
    } else if (sourceExtensions.has(extname(entry.name))) {
      files.push(relative(root, path))
    }
  }
}

for (const workspace of ['apps', 'packages']) {
  for (const entry of await readdir(join(root, workspace), { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const workspaceRoot = join(root, workspace, entry.name)
    files.push(relative(root, join(workspaceRoot, 'package.json')))
    try {
      await collectSources(join(workspaceRoot, 'src'))
    } catch (error) {
      if (error?.code !== 'ENOENT') throw error
    }
  }
}

const violations = []
for (const file of files) {
  let content
  try {
    content = await readFile(join(root, file), 'utf8')
  } catch (error) {
    if (error?.code === 'ENOENT') continue
    throw error
  }
  for (const [index, line] of content.split('\n').entries()) {
    if (forbidden.test(line)) violations.push(`${file}:${index + 1}: ${line.trim()}`)
  }
}

if (violations.length > 0) {
  console.error('Private AI integration references found in distributable sources:')
  console.error(violations.join('\n'))
  process.exitCode = 1
} else {
  console.log(`Private AI audit passed (${files.length} files checked).`)
}
