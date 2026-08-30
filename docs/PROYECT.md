# Proyecto: duoOffice

## Objetivo

Crear una versión personalizada de GenOffice llamada duoOffice, independiente de proveedores privados de IA. La aplicación conservará las funcionalidades y configuraciones de los demás proveedores, mientras se revisan selectivamente las actualizaciones de GenOffice antes de incorporarlas.

## Repositorios

- Fuente de referencia: https://github.com/genspark-ai/genoffice
- Repositorio de duoOffice: https://github.com/espilber/duoOffice

## Alcance inicial

- Eliminar la integración con el proveedor privado GenSpark.
- Eliminar el inicio de sesión y cualquier dependencia de cuenta de GenSpark.
- Mantener el resto de proveedores de IA y sus opciones de configuración.
- Identificar y decidir cómo gestionar el envío de estadísticas.
- Identificar y decidir cómo gestionar la comprobación de actualizaciones.
- Revisar las nuevas funciones y correcciones de GenOffice antes de incorporarlas.
- Realizar un rebranding completo a duoOffice, incluida una splash screen de inicio.
- Refinar la interfaz: barras de menús, botoneras y temas claro/oscuro.

## Tipo

Desarrollo de software.

## Criterios de decisión

- No introducir dependencia obligatoria de un proveedor privado de IA.
- Preservar la compatibilidad funcional del resto de proveedores.
- Evaluar privacidad, control y mantenibilidad antes de activar telemetría o actualizaciones.

## Decisión arquitectónica en evaluación: Electron y Tauri

- Decisión: Electron es la plataforma de escritorio de duoOffice.
- Tauri queda descartado y no forma parte del plan técnico actual.
- Motivo: GenOffice depende ampliamente de Electron en sus cinco editores y su shell; una migración exigiría reemplazar procesos principales, preloads, IPC, empaquetado, actualización y pruebas de extremo a extremo, con un riesgo elevado para la compatibilidad del producto.
