# Especificación: Rebranding técnico y splash screen

## Objetivo

Convertir la aplicación importada en duoOffice de extremo a extremo, sin identidad activa de GenOffice en la interfaz, el binario, las rutas de usuario, los paquetes internos o la distribución, y añadir una splash screen segura que cubra el arranque real.

## Requisitos

- [x] Sustituir nombre, wordmark, textos, títulos, menús, enlaces y metadatos visibles por duoOffice.
- [x] Cambiar identificadores de aplicación, ejecutables, artefactos, asociaciones, caché de actualización y rutas predeterminadas a duoOffice.
- [x] Renombrar el namespace interno `@genoffice/*` a `@duooffice/*` y las variables de entorno activas a `DUOOFFICE_*`.
- [x] No migrar automáticamente credenciales ni datos de la aplicación anterior; duoOffice usará un directorio de usuario independiente.
- [x] Implementar una splash screen local, sin marco, sin Node ni red, visible hasta que la ventana principal esté lista.
- [x] Aplicar un tiempo mínimo para evitar parpadeo y un timeout máximo para que la splash nunca bloquee el inicio.
- [x] Conservar las atribuciones legales de GenOffice/Mainfunc únicamente en avisos de procedencia y licencias.
- [x] Añadir una auditoría automática que impida reintroducir identidad activa de GenOffice en fuentes distribuibles y configuración de release.

## Criterios de aceptación

- Dado un instalable de duoOffice, cuando se inspeccionen su nombre, bundle ID, ejecutable, artefactos, asociaciones y feed, entonces todos usarán identidad duoOffice.
- Dada una primera ejecución, cuando arranque la aplicación, entonces aparecerá la splash y desaparecerá solo cuando la ventana principal esté lista, respetando mínimo y timeout.
- Dado un fallo o lentitud de carga, cuando venza el timeout de splash, entonces la ventana principal podrá mostrarse y el proceso no quedará bloqueado.
- Dado el monorepo, cuando se instalen dependencias y se ejecuten tipos, pruebas y builds, entonces el namespace `@duooffice/*` resolverá en todos los workspaces.
- Dadas las fuentes distribuibles, cuando se ejecute la auditoría de marca, entonces no habrá identidad activa de GenOffice o Genspark fuera de las excepciones legales documentadas.
- Dada una instalación previa de GenOffice, cuando se instale duoOffice, entonces sus credenciales y preferencias no se copiarán automáticamente al nuevo directorio de usuario.

## Estado

- Especificación: ✅ Aprobada
- Implementación: ✅ Completada
- Validación: ✅ Superada en macOS arm64

## Notas

- La identidad visual aprobada por el propietario del proyecto usa el icono cuadrado multicolor `icono_douoffice.png` y el wordmark vectorial `duooffice-logo.svg`, recibidos el 1 de septiembre de 2026. Deben integrarse sin reinterpretar su diseño.
- La splash está validada técnicamente, pero su composición visual actual es provisional. Queda pendiente aplicar las modificaciones de diseño que indique el propietario del proyecto y obtener su aprobación final; no se considerará diseño definitivo hasta entonces.
- La migración de documentos recientes o proyectos locales podrá diseñarse después como importación explícita y selectiva.
- Las menciones de GenOffice permitidas quedarán limitadas a `NOTICE`, licencias heredadas y documentación histórica bajo `/docs`.
- Windows y Linux requieren validación nativa posterior; el paquete macOS sirve como validación completa local del bloque.
