import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const electronMocks = vi.hoisted(() => {
  class FakeEmitter {
    private listeners = new Map<string, Array<(...args: unknown[]) => void>>()

    on(event: string, listener: (...args: unknown[]) => void): this {
      const listeners = this.listeners.get(event) ?? []
      listeners.push(listener)
      this.listeners.set(event, listeners)
      return this
    }

    once(event: string, listener: (...args: unknown[]) => void): this {
      const wrapper = (...args: unknown[]) => {
        this.listeners.set(
          event,
          (this.listeners.get(event) ?? []).filter((candidate) => candidate !== wrapper),
        )
        listener(...args)
      }
      return this.on(event, wrapper)
    }

    emit(event: string, ...args: unknown[]): void {
      for (const listener of [...(this.listeners.get(event) ?? [])]) listener(...args)
    }
  }

  class FakeWebContents extends FakeEmitter {}

  class FakeBrowserWindow extends FakeEmitter {
    readonly webContents = new FakeWebContents()
    readonly options: Record<string, unknown>
    destroyed = false
    show = vi.fn()
    focus = vi.fn()
    loadFile = vi.fn(async () => undefined)
    loadURL = vi.fn(async () => undefined)

    constructor(options: Record<string, unknown> = {}) {
      super()
      this.options = options
    }

    isDestroyed(): boolean {
      return this.destroyed
    }

    close(): void {
      this.destroyed = true
      this.emit('closed')
    }
  }

  return { FakeBrowserWindow }
})

vi.mock('electron', () => ({
  app: { getVersion: () => '1.2.3' },
  BrowserWindow: electronMocks.FakeBrowserWindow,
}))

import {
  SPLASH_MAX_VISIBLE_MS,
  SPLASH_MIN_VISIBLE_MS,
  closeSplashWindow,
  createSplashWindow,
  handoffSplashTo,
} from '../src/main/splash-window'

describe('startup splash window', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    closeSplashWindow()
    vi.useRealTimers()
  })

  it('uses a locked-down renderer and keeps the splash visible for the minimum interval', () => {
    const splash = createSplashWindow() as unknown as InstanceType<
      typeof electronMocks.FakeBrowserWindow
    >
    const main = new electronMocks.FakeBrowserWindow()
    const preferences = splash.options.webPreferences as Record<string, unknown>

    expect(preferences).toEqual({
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    })
    expect(preferences).not.toHaveProperty('preload')

    splash.emit('ready-to-show')
    handoffSplashTo(main as never)
    vi.advanceTimersByTime(SPLASH_MIN_VISIBLE_MS - 1)
    expect(main.show).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(splash.destroyed).toBe(true)
    expect(main.show).toHaveBeenCalledOnce()
    expect(main.focus).toHaveBeenCalledOnce()
  })

  it('falls back after the maximum interval when the splash never becomes ready', () => {
    const splash = createSplashWindow() as unknown as InstanceType<
      typeof electronMocks.FakeBrowserWindow
    >
    const main = new electronMocks.FakeBrowserWindow()
    handoffSplashTo(main as never)

    vi.advanceTimersByTime(SPLASH_MAX_VISIBLE_MS)

    expect(splash.destroyed).toBe(true)
    expect(main.show).toHaveBeenCalledOnce()
  })
})
