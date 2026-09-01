import { expect, test } from '@playwright/test'
import { closeAndSaveVideo, launchShell } from './helpers'

test.describe('startup splash screen', () => {
  test('appears before the secure shell and hands off after the minimum interval', async () => {
    const launched = await launchShell({
      videoDir: 'splash',
      onboardingSeen: true,
      observeSplash: true,
    })

    try {
      expect(launched.splash.observed).toBe(true)
      expect(launched.splash.secure).toBe(true)
      expect(launched.splash.durationMs).toBeGreaterThanOrEqual(600)
      await expect(launched.page.locator('.home-hero')).toBeVisible()
    } finally {
      await closeAndSaveVideo(launched, 'splash-handoff')
    }
  })
})
