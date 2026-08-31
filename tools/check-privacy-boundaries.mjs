import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

const root = process.cwd()
const files = [
  'apps/shell/electron-builder.cjs',
  'apps/shell/src/main/index.ts',
  'apps/shell/src/main/updater.ts',
  'apps/shell/src/preload/index.ts',
  'apps/shell/src/renderer/src/Onboarding.tsx',
  'apps/shell/src/renderer/src/SettingsModal.tsx',
  'apps/shell/src/shared/home-api.ts',
]

const forbidden = [
  /google-analytics\.com/i,
  /genofficeAnalytics/i,
  /GENOFFICE_GA4/i,
  /Measurement Protocol/i,
  /getAnalyticsEnabled/,
  /setAnalyticsEnabled/,
  /home:get-analytics-enabled/,
  /home:set-analytics-enabled/,
  /GENOFFICE_UPDATE_URL/,
  /provider:\s*['"]generic['"]/,
]

const required = new Map([
  [
    'apps/shell/electron-builder.cjs',
    [/provider:\s*['"]github['"]/, /owner:\s*['"]espilber['"]/, /repo:\s*['"]duoOffice['"]/],
  ],
  [
    'apps/shell/src/main/updater.ts',
    [
      /autoUpdater\.autoDownload\s*=\s*false/,
      /https:\/\/github\.com\/espilber\/duoOffice\/releases/,
    ],
  ],
])

const violations = []
for (const file of files) {
  const content = await readFile(join(root, file), 'utf8')
  for (const [index, line] of content.split('\n').entries()) {
    if (forbidden.some((pattern) => pattern.test(line))) {
      violations.push(`${file}:${index + 1}: ${line.trim()}`)
    }
  }
  for (const pattern of required.get(file) ?? []) {
    if (!pattern.test(content)) violations.push(`${file}: missing required policy: ${pattern}`)
  }
}

if (violations.length > 0) {
  console.error('Usage-reporting boundary violations found:')
  console.error(violations.join('\n'))
  process.exitCode = 1
} else {
  console.log(`Privacy boundary audit passed (${files.length} files checked).`)
}
