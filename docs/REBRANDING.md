# Rebranding: GenOffice → duoOffice

## Objetivo

Convertir la identidad técnica y visible de GenOffice en duoOffice sin conservar marcas, rutas, servicios ni metadatos que sugieran afiliación con GenOffice o Genspark.

## Alcance

### Identidad visible

- Sustituir nombre, logotipo y textos de GenOffice en la shell, editores, títulos de ventana, onboarding, diálogos, menús y mensajes de error.
- Crear un sistema de iconos duoOffice para la aplicación, los formatos asociados y los instaladores de macOS, Windows y Linux.
- Sustituir referencias a GitHub, web, comunidad, privacidad, soporte y descargas por destinos controlados por duoOffice.
- Actualizar las traducciones; el shell contiene actualmente 114 apariciones de `GenOffice`.

### Identidad técnica

- Renombrar paquetes `@genoffice/*` a `@duooffice/*` y actualizar sus importaciones, scripts y pruebas. Hay 19 manifiestos de paquetes bajo el espacio actual.
- Cambiar `productName`, `appId`, `desktopName`, nombre de artefactos, autor y metadatos de empaquetado. Los `appId` deben usar un espacio independiente, por ejemplo `com.duooffice.*`.
- Cambiar rutas de usuario, documentos, temporales, marcadores de portapapeles y variables de entorno con prefijo `GENOFFICE_` a prefijos duoOffice.
- Diseñar una migración deliberada de datos: no migrar credenciales ni estado de GenSpark; valorar por separado preferencias no sensibles, recientes y proyectos locales.

### Servicios y publicaciones

- Sustituir la URL de actualización, la página de descarga, los feeds de telemetría y el CDN de fuentes por servicios de duoOffice o desactivarlos hasta definir su política.
- Sustituir enlaces de GitHub y datos de comunidad; no reutilizar canales de GenOffice/Genspark.
- Actualizar README, documentación, privacidad, seguridad, contribución y avisos de distribución manteniendo las atribuciones y licencias de terceros exigibles.

## Splash screen

La splash screen se implementará en la shell de Electron como una ventana pequeña, sin marco y sin acceso a Node, creada antes de la ventana principal.

- Mostrará logotipo duoOffice, versión y un estado de carga accesible.
- Se mantendrá visible mientras se inicializan configuración, idioma, tema y servicios locales necesarios.
- Se cerrará únicamente cuando la ventana principal haya completado su primera carga útil, evitando pantallas en blanco.
- Tendrá un tiempo de visualización mínimo breve para evitar parpadeo y un límite máximo/fallback para no bloquear el inicio ante un error.
- No realizará llamadas a red ni mostrará información de GenOffice/Genspark.
- Se validará en macOS, Windows y Linux, incluido el inicio con un documento asociado.

## Orden recomendado

1. Desacoplar GenSpark y decidir estadísticas/actualizaciones.
2. Crear identidad visual y reemplazar activos, textos y metadatos públicos.
3. Cambiar IDs de aplicación, rutas y configuración de distribución.
4. Añadir la splash screen y sus pruebas de inicio.
5. Renombrar paquetes e importaciones como cambio mecánico aislado.
6. Auditar que no queden referencias activas a GenOffice/Genspark fuera de atribuciones legales.

## Criterios de aceptación

- Ninguna interfaz, instalador, título, icono, enlace, directorio de usuario, identificador de aplicación o feed de actualización presenta GenOffice o Genspark.
- Los avisos de licencia y atribución requeridos se conservan y distinguen claramente de la identidad duoOffice.
- La splash screen aparece en el arranque, no bloquea el inicio y desaparece al estar operativa la ventana principal.
- Las asociaciones de `.docx`, `.xlsx`, `.pptx`, `.pdf` y Markdown identifican duoOffice de forma coherente.
