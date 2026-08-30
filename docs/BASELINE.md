# Línea base importada

## Procedencia

- Snapshot: GenOffice `2239cce9e7f4ad07c2e8e327051ff1b8dda4562c`
- Incorporado en la rama: `import/genoffice-2239cce`
- Estrategia: importación del árbol de fuentes sin incorporar el historial Git de GenOffice.

## Entorno verificado

- Node.js: `v26.7.0` (el proyecto exige `>=22.12.0`)
- npm: `11.19.0` (el proyecto exige `>=10`)
- Rust/Cargo: `1.97.1`

## Validación inicial

- `npm ci`: completado.
- `npm run typecheck`: completado correctamente para los workspaces de la base importada.
- `npm test`: completado correctamente para la batería unitaria de la base importada.
- Construcción individual: completada correctamente para Docs, Sheets, Slides, PDF, Markdown y Shell.
- `npm run fixtures -w @genoffice/sheets`: completado; se han regenerado los seis fixtures de control.
- `npm run compat -w @genoffice/sheets`: completado; las cinco verificaciones XLSX han preservado todas las entradas ajenas a la hoja modificada.
- `npm run test:e2e`: completado; 43 pruebas E2E de escritorio ejecutadas sin errores.

## Observaciones heredadas

- Durante `npm ci`, npm informó de dos vulnerabilidades de severidad alta y de dependencias obsoletas. No se han actualizado durante la importación para mantener una línea de referencia fiel; se evaluarán en una especificación de dependencias y seguridad.
- Las pruebas de Docs emiten avisos de JSDOM sobre `HTMLCanvasElement.getContext()` sin instalar `canvas`; no se han tratado como fallo de la línea base.

## Validaciones pendientes

- Empaquetado y smoke tests en macOS, Windows y Linux.
