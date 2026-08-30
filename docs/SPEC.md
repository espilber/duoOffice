# Especificación: Desacoplamiento de GenSpark

## Objetivo

Eliminar de duoOffice la integración con GenSpark y su autenticación, manteniendo disponibles los demás proveedores de IA y su configuración.

## Requisitos

- [ ] Localizar y eliminar la integración del proveedor GenSpark.
- [ ] Eliminar el inicio de sesión, credenciales y flujos de cuenta vinculados a GenSpark.
- [ ] Mantener el resto de proveedores y sus opciones de configuración.
- [ ] Identificar los mecanismos actuales de envío de estadísticas y proponer una política para duoOffice.
- [ ] Identificar la comprobación de actualizaciones y proponer dónde y cómo realizarla.
- [ ] Eliminar las rutas de ejecución de GenSpark —autenticación, dependencias, credenciales y red— además de sus elementos visuales.
- [ ] Separar el registro de proveedores y herramientas de IA para que los cambios futuros de GenOffice se puedan integrar sin reactivar GenSpark.

## Criterios de Aceptación

- Dado un usuario de duoOffice, cuando configure un proveedor distinto de GenSpark, entonces podrá utilizarlo con su configuración existente.
- Dado un usuario de duoOffice, cuando inicie la aplicación, entonces no se le solicitará iniciar sesión en GenSpark.
- Dado el código y la configuración de duoOffice, cuando se auditen las dependencias de GenSpark, entonces no quedarán integraciones obligatorias ni referencias activas no justificadas.
- Dado un binario de duoOffice, cuando se inicie o se use cualquier proveedor disponible, entonces no se cargará `@genspark/cli`, no se leerán credenciales de Genspark ni se harán solicitudes a sus dominios.
- Dado el sistema de estadísticas y actualizaciones, cuando se documente su diseño, entonces quedarán definidos su mecanismo, destino, control del usuario y política de privacidad.

## Estado

- Especificación: 📝 Borrador
- Implementación: ⏳ Pendiente
- Validación: ⏳ Pendiente

## Notas

- GenOffice se utilizará como fuente de referencia para futuras correcciones y funciones.
- Las actualizaciones de GenOffice se evaluarán individualmente antes de incorporarlas.
- El alcance exacto de la limpieza del repositorio se definirá antes de borrar contenido.
- Tauri está descartado. duoOffice conservará Electron como plataforma de escritorio.
- El alcance y los criterios del rebranding se documentan en `REBRANDING.md`; la splash screen forma parte de ese trabajo.
- Ocultar controles de GenSpark no es una eliminación válida: dejaría autenticación, credenciales y rutas de red dentro de la distribución. Para facilitar las actualizaciones desde GenOffice, se aislará el registro de proveedores y herramientas; el código eliminado podrá conservarse únicamente en una rama de seguimiento upstream, no en el binario de duoOffice.
