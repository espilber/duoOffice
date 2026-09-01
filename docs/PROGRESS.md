# Progreso del proyecto

## Sesión inicial — 2026-08-31

- Proyecto identificado como `duoOffice`.
- Definido el objetivo de crear una versión independiente de GenOffice.
- Registrados los repositorios de referencia y destino.
- Definido el primer objetivo SDD: eliminar GenSpark y su inicio de sesión.
- Pendientes de decisión: estadísticas, comprobación de actualizaciones y alcance exacto de limpieza del repositorio.
- Analizada la alternativa de Tauri frente a Electron. Decisión: Tauri descartado; duoOffice conservará Electron.
- Evaluado el rebranding completo de GenOffice a duoOffice y documentado en `REBRANDING.md`, incluida la splash screen.
- Evaluada la estrategia de ocultar GenSpark: rechazada como solución final. Se conservará la facilidad de integrar upstream mediante aislamiento de proveedores, no distribuyendo el código y dependencias de GenSpark.
- Añadido como objetivo el refinamiento de menús, botoneras y temas claro/oscuro; alcance inicial en `UI-REFINEMENT.md`.
- El historial accesible del repositorio remoto `espilber/duoOffice` fue sustituido por un único commit raíz vacío: `39f403f` (`chore: initialize duoOffice`).
- Creada la hoja de ruta integral del proyecto en `ROADMAP.md`, desde la fundación del repositorio hasta la sincronización selectiva con GenOffice.
- Fase 0 iniciada: directorio local conectado a `origin/main`; añadido remoto `upstream` de solo lectura y fijado el commit inicial de GenOffice en `2239cce` (detalle en `UPSTREAM.md`).
- Snapshot de GenOffice `2239cce` importado en `import/genoffice-2239cce` sin heredar su historial Git. `npm ci`, typecheck y pruebas unitarias completados; resultados y observaciones en `BASELINE.md`.
- Validación de compatibilidad completada: regenerados los fixtures de Sheets, verificadas cinco operaciones XLSX sin cambios inesperados y ejecutadas correctamente las 43 pruebas E2E de escritorio. Solo queda validar el empaquetado y los smoke tests por plataforma antes de cerrar la fase de importación.
- Creada la rama `feature/remove-genspark` para el bloque de independencia del proveedor privado.
- Eliminados el proveedor privado del registro de IA, su adaptador, autenticación, CLI, credenciales, login, proyectos cloud, generación multimedia privada y conversión PDF→Word cloud.
- Conservados los proveedores BYOK y su configuración; Anthropic pasa a ser el proveedor predeterminado y las selecciones antiguas se migran a un proveedor BYOK configurado.
- Las capacidades sin alternativa privada quedan explícitamente locales o basadas en búsqueda pública: Serper/DuckDuckGo para búsqueda e imágenes, generación local de Slides y conversión PDF→Word local.
- Sustituidos los elementos visuales del asistente por identidad genérica de duoOffice y actualizados los enlaces de repositorio/descargas a `espilber/duoOffice`.
- Añadida la puerta automática `npm run check:no-private-ai`, que audita fuentes distribuibles, manifiestos y lockfile; superada sobre 829 archivos.
- Validación del bloque: formato, typecheck global, compilación de los seis workspaces y pruebas de todos los módulos superadas. Se estabilizaron dos pruebas dependientes del entorno (`PassThrough` y almacenamiento local) sin alterar comportamiento productivo.
- E2E de escritorio sobre la aplicación adaptada: 38 pruebas superadas y 5 regresiones visuales omitidas por configuración, sin fallos.
- Auditada y eliminada la telemetría heredada completa: tracker GA4, UUID de instalación, eventos, credenciales de empaquetado, IPC, ajustes, onboarding y textos asociados. duoOffice no envía estadísticas de uso.
- Definida la política de actualización: feed público de GitHub Releases `espilber/duoOffice`, estable por defecto y beta voluntaria; comprobación automática, pero descarga e instalación siempre iniciadas por el usuario.
- Corregido el empaquetador, que todavía intentaba copiar `@genspark/cli`, `commander` y `ws`; también se retiró la dependencia raíz `ws` y se sustituyeron los metadatos privados de Linux.
- Añadida la puerta `npm run check:privacy-boundaries` y ampliada `check:no-private-ai` para cubrir configuración de empaquetado y seguridad.
- Validación del bloque de privacidad/actualizaciones: 180 pruebas unitarias del shell, typecheck, build de los seis workspaces y 38 E2E correctos (5 visuales omitidas).
- Generado y auditado un ZIP macOS arm64: sin recursos privados y con `app-update.yml` fijado a GitHub. El empaquetado nativo de Windows/Linux queda para CI en esas plataformas.
- La fase de independencia y privacidad queda completada. El siguiente bloque es el rebranding técnico y la experiencia de arranque.

## Rebranding y splash — 2026-09-01

- Recibidos y fijados como identidad oficial, sin reinterpretación, `icono_douoffice.png` para el icono de aplicación y `duooffice-logo.svg` para la firma visible de la interfaz.
- Aplicado el rebranding técnico completo: namespace `@duooffice/*`, variables `DUOOFFICE_*`, títulos, enlaces, rutas, nombres de paquete, asociaciones y metadatos de distribución.
- Fijados `productName=duoOffice`, `appId=com.duooffice.app`, ejecutable `duoOffice` en macOS y artefactos `duoOffice-0.8.0-arm64`.
- Generadas desde el icono aprobado las variantes ICNS, ICO y Linux; los metadatos internos de las seis fuentes modificadas también usan identidad duoOffice.
- Retirados los restos no ejecutables de cuenta, login, proyectos web, créditos y conversión cloud que aún permanecían en traducciones y componentes heredados.
- Implementada una splash local y segura (`contextIsolation`, sandbox, sin Node, preload ni red), con mínimo de 650 ms, fallback de 12 s y handoff a la ventana principal lista.
- Añadidas pruebas unitarias y E2E del splash y la auditoría `npm run check:brand-boundaries`; los recursos visuales aprobados quedan protegidos mediante SHA-256.
- Validación superada: formato, typecheck global, auditorías de marca/privacidad/proveedor privado, pruebas unitarias de todos los workspaces, build completo y 39 E2E ejecutables; 5 regresiones visuales permanecen omitidas por configuración.
- Generados `duoOffice-0.8.0-arm64.dmg` y `duoOffice-0.8.0-arm64-mac.zip` sin firma/notarización. El paquete declara `duoOffice`, `com.duooffice.app`, ejecutable propio, icono aprobado y fuentes renombradas.
- Windows y Linux quedan pendientes de validación nativa en CI. El siguiente bloque será el refinamiento de interfaz, siempre consultando antes las decisiones de diseño.

## Referencias

- [REF: SPEC.md#requisitos] Rebranding técnico y splash screen.
