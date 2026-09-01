import { join } from 'node:path'
import { BrowserWindow, app } from 'electron'

const configuredMinimum = Number.parseInt(process.env.DUOOFFICE_SPLASH_MIN_VISIBLE_MS ?? '', 10)
export const SPLASH_MIN_VISIBLE_MS =
  Number.isFinite(configuredMinimum) && configuredMinimum >= 0 ? configuredMinimum : 650
export const SPLASH_MAX_VISIBLE_MS = 12_000

let splashWindow: BrowserWindow | null = null
let splashShownAt: number | null = null
let pendingMainWindow: BrowserWindow | null = null
let handoffTimer: ReturnType<typeof setTimeout> | null = null
let fallbackTimer: ReturnType<typeof setTimeout> | null = null

function clearTimers(): void {
  if (handoffTimer) clearTimeout(handoffTimer)
  if (fallbackTimer) clearTimeout(fallbackTimer)
  handoffTimer = null
  fallbackTimer = null
}

function showMainWindow(): void {
  const main = pendingMainWindow
  pendingMainWindow = null
  if (main && !main.isDestroyed()) {
    main.show()
    main.focus()
  }
}

function finishHandoff(): void {
  clearTimers()
  if (splashWindow && !splashWindow.isDestroyed()) splashWindow.close()
  splashWindow = null
  splashShownAt = null
  showMainWindow()
}

function scheduleHandoff(): void {
  if (!pendingMainWindow || splashShownAt === null) return
  if (handoffTimer) clearTimeout(handoffTimer)
  const remaining = Math.max(0, SPLASH_MIN_VISIBLE_MS - (Date.now() - splashShownAt))
  handoffTimer = setTimeout(finishHandoff, remaining)
}

export function createSplashWindow(): BrowserWindow {
  if (splashWindow && !splashWindow.isDestroyed()) return splashWindow

  const win = new BrowserWindow({
    width: 520,
    height: 330,
    frame: false,
    show: false,
    resizable: false,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    skipTaskbar: true,
    alwaysOnTop: true,
    center: true,
    backgroundColor: '#ffffff',
    title: 'duoOffice — Starting',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  })
  splashWindow = win

  win.once('ready-to-show', () => {
    if (win.isDestroyed()) return
    splashShownAt = Date.now()
    win.show()
    scheduleHandoff()
  })
  win.webContents.once('did-fail-load', finishHandoff)
  win.on('closed', () => {
    if (splashWindow === win) splashWindow = null
  })

  fallbackTimer = setTimeout(finishHandoff, SPLASH_MAX_VISIBLE_MS)
  const version = app.getVersion()
  if (process.env.ELECTRON_RENDERER_URL) {
    void win.loadURL(
      `${process.env.ELECTRON_RENDERER_URL}/splash.html?version=${encodeURIComponent(version)}`,
    )
  } else {
    void win.loadFile(join(__dirname, '../renderer/splash.html'), { query: { version } })
  }
  return win
}

export function handoffSplashTo(mainWindow: BrowserWindow): void {
  pendingMainWindow = mainWindow
  if (!splashWindow || splashWindow.isDestroyed()) {
    showMainWindow()
    return
  }
  scheduleHandoff()
}

export function closeSplashWindow(): void {
  pendingMainWindow = null
  clearTimers()
  if (splashWindow && !splashWindow.isDestroyed()) splashWindow.close()
  splashWindow = null
  splashShownAt = null
}
