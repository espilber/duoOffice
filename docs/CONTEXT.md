# Contexto del proyecto

## Identidad

duoOffice es una versión personalizada de GenOffice, basada en su repositorio como fuente de referencia, pero sin vinculación obligatoria con GenSpark ni con su cuenta privada.

## Decisiones actuales

- Mantener el resto de proveedores de IA y sus configuraciones.
- Eliminar la integración y el inicio de sesión de GenSpark.
- Revisar las actualizaciones de GenOffice antes de incorporarlas.
- duoOffice no incorpora telemetría de uso. Cualquier propuesta futura requerirá revisión separada, consentimiento opt-in, infraestructura propia y política de retención explícita.
- Las actualizaciones se consultan exclusivamente en GitHub Releases de `espilber/duoOffice`. La descarga y la instalación requieren una acción explícita del usuario; estable es el canal predeterminado y beta es voluntario.
- Electron es la plataforma de escritorio de duoOffice. Tauri queda descartado.
- duoOffice requiere rebranding completo, incluyendo identidad visual, IDs técnicos, rutas, servicios de publicación y una splash screen de inicio.
- GenSpark se eliminará de la distribución en todas sus capas; no basta con ocultar sus paneles. La integración de cambios de GenOffice se apoyará en una arquitectura de registro de proveedores/herramientas y una rama de seguimiento upstream.
- duoOffice también incluirá un refinamiento de interfaz para menús, botoneras y temas claro/oscuro, sin comprometer la fidelidad de las superficies de documento.
- La rama `main` del repositorio remoto de duoOffice comienza con un commit raíz vacío y está lista para iniciar la importación y adaptación controlada de la base de GenOffice.
- La ejecución se organiza por fases: fundación, importación base, independencia de GenSpark, rebranding, refinamiento de interfaz, distribución alpha y sincronización selectiva con upstream. El plan completo está en `ROADMAP.md`.
- Referencia upstream inicial: GenOffice `2239cce9e7f4ad07c2e8e327051ff1b8dda4562c`; la política de revisión e integración está en `UPSTREAM.md`.
- El árbol de fuentes de la referencia upstream está importado en la rama `import/genoffice-2239cce`, sin arrastrar el historial Git de GenOffice. La línea base está documentada en `BASELINE.md`.
- La línea base ha superado instalación, tipos, unitarias, builds por workspace, compatibilidad XLSX (cinco fixtures) y 43 pruebas E2E. Pendiente de la fase de importación: empaquetado y smoke tests por plataforma.

## Estado

El desacoplamiento técnico del proveedor privado está implementado en `feature/remove-genspark`: no quedan dependencias, dominios, credenciales ni rutas ejecutables privadas en las fuentes distribuibles. La auditoría automática y el detalle están en `PRIVATE-AI-AUDIT.md`.

La fase de independencia y privacidad está completada. Además del desacoplamiento privado, se eliminó la telemetría heredada y se fijaron las actualizaciones al repositorio público de duoOffice. El paquete macOS arm64 y su feed embebido están validados; Windows y Linux se validarán en CI nativa durante la fase de distribución.

El siguiente bloque es el rebranding técnico completo y la experiencia de arranque, incluida la splash screen.
