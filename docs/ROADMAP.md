# Hoja de ruta: duoOffice

## Principios operativos

- La rama `main` de duoOffice representa únicamente código distribuible por duoOffice.
- GenOffice es una fuente upstream, no un remoto del que se integren cambios sin revisión.
- Cada adaptación se implementa en una rama temática, con una referencia explícita a la especificación y validación antes de fusionarse.
- Electron se conserva como plataforma de escritorio.
- Privacidad por defecto: GenSpark queda fuera de la distribución; telemetría y actualización automática permanecen desactivadas hasta que se defina y apruebe su diseño.

## Fase 0 — Fundaciones del repositorio

**Objetivo:** dejar una base reproducible y trazable antes de importar código.

1. Conectar el directorio de trabajo con el repositorio remoto vacío y publicar la documentación inicial.
2. Añadir `origin` para duoOffice y `upstream` de solo lectura para GenOffice.
3. Documentar el commit exacto de GenOffice elegido para la importación y sus avisos de licencia/atribución aplicables.
4. Configurar herramientas, versiones de Node/Rust y CI para typecheck, pruebas y empaquetado.
5. Definir convenciones: ramas, formato de commits con referencia a `SPEC.md`, plantilla de pull request y registro de decisiones.

**Puerta de salida:** clon limpio capaz de instalar dependencias y ejecutar al menos typecheck y pruebas de los motores sin cambios de producto.

## Fase 1 — Importación base y línea de referencia

**Objetivo:** disponer de un snapshot reproducible de GenOffice que se pueda ejecutar y comparar.

1. Importar una única revisión fijada de GenOffice, preservando licencias, `NOTICE` y atribuciones necesarias.
2. Crear una etiqueta de referencia `upstream-base-<fecha>-<sha>`.
3. Ejecutar la batería de pruebas disponible y registrar resultados, dependencias nativas y limitaciones por plataforma.
4. Construir la shell Electron en macOS y preparar CI para Windows y Linux.
5. Generar una matriz de funcionalidades: Docs, Sheets, Slides, PDF, Markdown, shell, IA, herramientas cloud, estadísticas y actualizaciones.

**Puerta de salida:** la base se ejecuta y sus fallos conocidos están documentados; cualquier regresión posterior se compara contra esta línea.

## Fase 2 — Independencia de GenSpark y privacidad

**Objetivo:** convertir duoOffice en un producto que no incluya ni active GenSpark.

1. Inventariar todos los puntos de integración: UI, autenticación, proveedor, CLI, credenciales, red, proyectos cloud y herramientas de agente.
2. Separar el registro de proveedores y herramientas para que las integraciones sean módulos explícitos.
3. Eliminar del binario y dependencias la autenticación, `@genspark/cli`, credenciales y dominios de GenSpark.
4. Mantener operativos los proveedores BYOK y sus configuraciones; decidir alternativas o desactivación explícita para búsqueda, imágenes, multimedia y conversión que dependían de GenSpark.
5. Definir por escrito la política de telemetría y actualizaciones. Hasta su aprobación, no se enviarán estadísticas ni se consultarán feeds de actualización.

**Validación:** pruebas de configuración BYOK, análisis estático de dependencias y referencias, y pruebas de red que demuestren que duoOffice no lee credenciales ni contacta dominios de GenSpark.

## Fase 3 — Rebranding y experiencia de arranque

**Objetivo:** que el producto distribuido se identifique íntegramente como duoOffice.

1. Definir identidad visual, nombre de aplicaciones y sistema de iconos.
2. Sustituir nombres, textos, enlaces, onboarding, títulos de ventana y activos visibles.
3. Cambiar identificadores de aplicación, asociaciones de archivo, rutas de datos y configuración de empaquetado a `duoOffice`/`com.duooffice.*`.
4. Implementar la splash screen nativa de Electron y sus pruebas de inicio, errores y apertura de archivos asociados.
5. Renombrar paquetes internos `@genoffice/*` a `@duooffice/*` como cambio mecánico aislado una vez estabilizada la base; actualizar importaciones, scripts y pruebas.
6. Ejecutar auditoría final de marcas: las únicas referencias a GenOffice deben ser atribuciones o documentación interna de upstream.

**Puerta de salida:** instalable y primera ejecución sin identidad, servicio, directorio ni ruta activa de GenOffice/Genspark.

## Fase 4 — Refinamiento de interfaz

**Objetivo:** crear una interfaz duoOffice más clara y consistente sin degradar los editores.

1. Auditar menús, ribbon/botoneras, iconos, espaciado, estados y atajos de los cinco editores y la shell.
2. Consolidar tokens de diseño para color, tipografía, foco, bordes, superficies y estados.
3. Refinar por componentes compartidos antes de realizar cambios específicos por editor.
4. Diseñar y validar los temas claro, oscuro y sistema; las superficies de documento conservarán la fidelidad necesaria para Office/PDF.
5. Añadir pruebas visuales y de accesibilidad para las rutas principales.

**Validación:** revisión visual, navegación por teclado, contraste, snapshots de UI y pruebas de regresión de documentos.

## Fase 5 — Distribución, seguridad y alpha de duoOffice

**Objetivo:** publicar una primera alpha verificable y controlada.

1. Configurar firmas, artefactos y canales de distribución para macOS, Windows y Linux.
2. Publicar documentación de instalación, privacidad, seguridad, contribución y atribuciones.
3. Implementar el mecanismo de actualización únicamente si la política y la infraestructura de distribución están aprobadas; en caso contrario, publicar actualizaciones manuales firmadas.
4. Ejecutar la matriz de aceptación de los formatos `.docx`, `.xlsx`, `.pptx`, `.pdf` y Markdown en las tres plataformas.
5. Preparar la versión alpha y un registro de limitaciones conocidas.

**Definición de alpha:** arranque fiable, datos locales, edición y guardado de los formatos soportados, proveedores BYOK funcionales, ausencia demostrable de GenSpark, identidad duoOffice completa y pruebas de regresión superadas.

## Fase 6 — Mantenimiento sincronizado con GenOffice

**Objetivo:** incorporar valor upstream sin perder independencia.

1. Revisar periódicamente los cambios de GenOffice y clasificarlos: corrección, funcionalidad útil, dependencia privada, cambio de interfaz o riesgo de compatibilidad.
2. Crear una especificación corta para cada lote aceptado y aplicarlo en una rama de integración separada.
3. Resolver conflictos respetando las capas propias de duoOffice: proveedores, privacidad, branding, UI y distribución.
4. Ejecutar toda la matriz de validación y documentar cambios rechazados junto a su motivo.
5. Fusionar únicamente lotes aprobados y actualizar `CONTEXT.md` y `PROGRESS.md`.

## Matriz de validación continua

| Área | Verificación mínima |
| --- | --- |
| Código | formato, typecheck, pruebas unitarias y análisis de dependencias |
| Documentos | abrir, editar, guardar y reabrir archivos de prueba DOCX/XLSX/PPTX/PDF/Markdown |
| Privacidad | ausencia de GenSpark en dependencias activas, credenciales, red y binario |
| UI | pruebas visuales, contraste, foco, teclado y temas claro/oscuro |
| Arranque | splash screen, inicio normal, recuperación tras error y apertura por asociación |
| Plataformas | empaquetado y smoke tests en macOS, Windows y Linux |
| Upstream | diff revisado, especificación, pruebas completas y decisión registrada |

## Primer bloque de ejecución

El siguiente trabajo concreto es la **Fase 0**: enlazar el directorio de trabajo con el remoto, publicar la documentación, fijar la revisión upstream y crear la línea base de CI/pruebas. Después se abordará la Fase 2 antes del rebranding final, para que ningún elemento visual de duoOffice quede construido sobre una integración de GenSpark que vaya a desaparecer.
