# Contexto del proyecto

## Identidad

duoOffice es una versión personalizada de GenOffice, basada en su repositorio como fuente de referencia, pero sin vinculación obligatoria con GenSpark ni con su cuenta privada.

## Decisiones actuales

- Mantener el resto de proveedores de IA y sus configuraciones.
- Eliminar la integración y el inicio de sesión de GenSpark.
- Revisar las actualizaciones de GenOffice antes de incorporarlas.
- Definir posteriormente el mecanismo y destino de estadísticas y actualizaciones.
- Electron es la plataforma de escritorio de duoOffice. Tauri queda descartado.
- duoOffice requiere rebranding completo, incluyendo identidad visual, IDs técnicos, rutas, servicios de publicación y una splash screen de inicio.
- GenSpark se eliminará de la distribución en todas sus capas; no basta con ocultar sus paneles. La integración de cambios de GenOffice se apoyará en una arquitectura de registro de proveedores/herramientas y una rama de seguimiento upstream.
- duoOffice también incluirá un refinamiento de interfaz para menús, botoneras y temas claro/oscuro, sin comprometer la fidelidad de las superficies de documento.
- La rama `main` del repositorio remoto de duoOffice comienza con un commit raíz vacío y está lista para iniciar la importación y adaptación controlada de la base de GenOffice.
- La ejecución se organiza por fases: fundación, importación base, independencia de GenSpark, rebranding, refinamiento de interfaz, distribución alpha y sincronización selectiva con upstream. El plan completo está en `ROADMAP.md`.
- Referencia upstream inicial: GenOffice `2239cce9e7f4ad07c2e8e327051ff1b8dda4562c`; la política de revisión e integración está en `UPSTREAM.md`.
- El árbol de fuentes de la referencia upstream está importado en la rama `import/genoffice-2239cce`, sin arrastrar el historial Git de GenOffice. La línea base está documentada en `BASELINE.md`.

## Estado

La estructura de memoria está iniciada. La especificación de desacoplamiento está en borrador y todavía no se ha modificado ni limpiado el código del repositorio.
