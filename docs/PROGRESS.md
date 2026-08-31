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
- Pendiente antes de cerrar la fase: smoke del paquete por plataforma y definición de las políticas propias de telemetría y actualización.

## Referencias

- [REF: SPEC.md#requisitos] Desacoplamiento de GenSpark.
