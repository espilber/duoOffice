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

## Referencias

- [REF: SPEC.md#requisitos] Desacoplamiento de GenSpark.
