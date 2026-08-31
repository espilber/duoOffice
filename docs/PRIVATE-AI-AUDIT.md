# Auditoría de independencia del proveedor privado

## Resultado

Las fuentes distribuibles de duoOffice ya no contienen el proveedor privado, su CLI, autenticación, credenciales, dominios, cabeceras, endpoints ni rutas cloud. La comprobación se ejecuta con:

```sh
npm run check:no-private-ai
```

La puerta examina manifiestos, lockfile, configuración de empaquetado, plantilla de seguridad y código fuente de `apps/*/src` y `packages/*/src`. Las referencias históricas necesarias permanecen únicamente en documentación de upstream y pruebas de migración que no se distribuyen.

## Arquitectura resultante

- El catálogo de IA contiene solo proveedores BYOK y el proveedor personalizado.
- Anthropic es el valor predeterminado; una selección heredada se migra al primer BYOK configurado o al predeterminado.
- El shell no registra IPC de cuenta, login, créditos ni proyectos cloud.
- La API de preload conserva fachadas inertes sin IPC para reducir conflictos al revisar parches upstream; no leen credenciales, abren URLs ni realizan solicitudes.
- Búsqueda: Serper cuando existe clave y DuckDuckGo como alternativa pública.
- Imágenes: búsqueda e inserción desde resultados públicos; no hay generación privada.
- Slides: generación local mediante el proveedor BYOK seleccionado.
- PDF→Word: conversión local; se retiró la variante cloud.

## Validación completada

- `npm run check:no-private-ai`: 830 archivos, sin incidencias.
- `npm run check:privacy-boundaries`: sin endpoints ni API de telemetría; origen de actualizaciones y descarga manual verificados.
- `npm run format:check`: correcto.
- `npm run typecheck`: correcto en todos los workspaces.
- `npm run build:all`: correcto en Docs, Sheets, Slides, PDF, Markdown y Shell.
- Pruebas unitarias por workspace: correctas, incluidas 139 pruebas Rust de Sheets.
- `npm run test:e2e`: 38 pruebas superadas y 5 visuales omitidas por configuración, sin fallos.
- Paquete ZIP macOS arm64 generado sin recursos privados. Su `app-update.yml` embebido contiene exclusivamente `espilber/duoOffice`, proveedor `github` y canal `latest`.

## Pendiente

- Empaquetado y smoke nativos de Windows y Linux en sus respectivos runners.
- Rebranding técnico completo de nombres de paquetes, rutas, activos y metadatos, que pertenece a la fase siguiente.
