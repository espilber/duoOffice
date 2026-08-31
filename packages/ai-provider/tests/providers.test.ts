import { describe, expect, it } from 'vitest'
import {
  AI_PROVIDERS,
  activeProvider,
  defaultAiSettings,
  resolveAiSettings,
} from '../src/providers'
import type { AiProviderId } from '../src/types'

describe('defaultAiSettings', () => {
  it('gives every provider its default model and an empty key by default', () => {
    const settings = defaultAiSettings()
    expect(settings.provider).toBe('anthropic')
    for (const meta of AI_PROVIDERS) {
      expect(settings.providers[meta.id].apiKey).toBe('')
      expect(settings.providers[meta.id].model).toBe(meta.defaultModel)
    }
    expect(settings.providers.custom.baseUrl).toBe('')
    expect(settings.providers.anthropic.baseUrl).toBeUndefined()
  })

  it('applies caller-supplied default keys only to the listed providers', () => {
    const settings = defaultAiSettings({ anthropic: 'sk-ant-preset' })
    expect(settings.providers.anthropic.apiKey).toBe('sk-ant-preset')
    expect(settings.providers.gemini.apiKey).toBe('')
  })
})

describe('provider model catalog', () => {
  it('offers DeepSeek Vision Exp through the direct BYOK provider', () => {
    const deepseek = AI_PROVIDERS.find((provider) => provider.id === 'deepseek')!

    expect(deepseek.models).toContain('deepseek-v4-flash-vision-exp')
  })
})

describe('resolveAiSettings', () => {
  it('returns fresh defaults when nothing is stored', () => {
    const defaults = defaultAiSettings({ anthropic: 'sk-ant-preset' })
    expect(resolveAiSettings({}, defaults)).toEqual(defaults)
  })

  it('migrates the pre-provider single-endpoint shape into the custom provider', () => {
    const defaults = defaultAiSettings()
    const resolved = resolveAiSettings(
      { apiKey: 'legacy-key', model: 'legacy-model', baseUrl: 'https://legacy.example.com/v1' },
      defaults,
    )
    expect(resolved.providers.custom).toEqual({
      apiKey: 'legacy-key',
      model: 'legacy-model',
      baseUrl: 'https://legacy.example.com/v1',
    })
    // untouched providers keep their defaults
    expect(resolved.providers.anthropic).toEqual(defaults.providers.anthropic)
  })

  it('defaults the legacy base URL to the OpenAI endpoint when omitted', () => {
    const resolved = resolveAiSettings({ apiKey: 'legacy-key' }, defaultAiSettings())
    expect(resolved.providers.custom.baseUrl).toBe('https://api.openai.com/v1')
  })

  it('merges stored multi-provider settings over the defaults, provider by provider', () => {
    const defaults = defaultAiSettings({ anthropic: 'preset-key' })
    const resolved = resolveAiSettings(
      {
        provider: 'gemini',
        providers: {
          gemini: { apiKey: 'stored-gemini-key', model: 'gemini-2.5-pro' },
        } as never,
      },
      defaults,
    )
    expect(resolved.provider).toBe('gemini')
    expect(resolved.providers.gemini).toEqual({
      apiKey: 'stored-gemini-key',
      model: 'gemini-2.5-pro',
    })
    // provider not mentioned in stored.providers keeps the computed default
    expect(resolved.providers.anthropic.apiKey).toBe('preset-key')
  })

  it('migrates a legacy Genspark selection to an already configured BYOK provider', () => {
    const resolved = resolveAiSettings(
      {
        provider: 'genspark',
        providers: {
          genspark: { apiKey: '', model: 'claude-opus-4-7' },
          openai: { apiKey: 'sk-user', model: 'gpt-5.4-mini' },
        } as never,
      },
      defaultAiSettings(),
    )
    expect(resolved.provider).toBe('openai')
    expect('genspark' in resolved.providers).toBe(false)
  })

  it('rewrites a stored model id the vendor has retired', () => {
    const resolved = resolveAiSettings(
      {
        providers: {
          deepseek: { apiKey: 'sk-user', model: 'deepseek-reasoner' },
        } as never,
      },
      defaultAiSettings(),
    )
    expect(resolved.providers.deepseek).toEqual({ apiKey: 'sk-user', model: 'deepseek-v4-flash' })
  })

  it('leaves a still-supported model id alone', () => {
    const resolved = resolveAiSettings(
      {
        providers: {
          deepseek: { apiKey: 'sk-user', model: 'deepseek-v4-pro' },
        } as never,
      },
      defaultAiSettings(),
    )
    expect(resolved.providers.deepseek.model).toBe('deepseek-v4-pro')
  })

  it('trims whitespace pasted around stored keys and base URLs', () => {
    const resolved = resolveAiSettings(
      {
        providers: {
          deepseek: { apiKey: ' sk-user\n', model: 'deepseek-v4-pro' },
          custom: { apiKey: 'k', model: 'm', baseUrl: ' http://localhost:1234/v1 ' },
        } as never,
      },
      defaultAiSettings(),
    )
    expect(resolved.providers.deepseek.apiKey).toBe('sk-user')
    expect(resolved.providers.deepseek.baseUrl).toBeUndefined()
    expect(resolved.providers.custom.baseUrl).toBe('http://localhost:1234/v1')
  })

  it('trims the legacy single-endpoint key and base URL too', () => {
    const resolved = resolveAiSettings(
      { apiKey: ' legacy-key ', baseUrl: ' https://legacy.example.com/v1 ' },
      defaultAiSettings(),
    )
    expect(resolved.providers.custom.apiKey).toBe('legacy-key')
    expect(resolved.providers.custom.baseUrl).toBe('https://legacy.example.com/v1')
  })
})

describe('activeProvider', () => {
  it('keeps a known BYOK selection so the UI can request missing configuration', () => {
    const settings = defaultAiSettings()
    expect(activeProvider(settings)).toBe('anthropic')

    settings.provider = 'kimi'
    expect(activeProvider(settings)).toBe('kimi')
    settings.providers.kimi.apiKey = 'sk-user'
    expect(activeProvider(settings)).toBe('kimi')
  })

  it('keeps custom selected while its required fields are being configured', () => {
    const settings = defaultAiSettings()
    settings.provider = 'custom'
    settings.providers.custom.apiKey = 'k'
    expect(activeProvider(settings)).toBe('custom')
    settings.providers.custom.baseUrl = 'http://localhost:1234/v1'
    expect(activeProvider(settings)).toBe('custom')
    settings.providers.custom.model = 'my-model'
    expect(activeProvider(settings)).toBe('custom')
  })

  it('falls back to the default BYOK provider for unknown ids', () => {
    const settings = defaultAiSettings()
    settings.provider = 'nonsense' as AiProviderId
    expect(activeProvider(settings)).toBe('anthropic')
  })
})
