const version = new URLSearchParams(window.location.search).get('version')?.trim()
const versionElement = document.querySelector<HTMLElement>('#splash-version')
if (version && versionElement) versionElement.textContent = `Version ${version}`
