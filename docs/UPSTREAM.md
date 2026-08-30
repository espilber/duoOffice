# Referencia upstream: GenOffice

## Fuente fijada

- Repositorio: https://github.com/genspark-ai/genoffice
- Remoto local: `upstream` (solo lectura)
- Commit de referencia inicial: `2239cce9e7f4ad07c2e8e327051ff1b8dda4562c`
- Fecha de fijación: 2026-08-31

## Política de integración

1. `main` contiene solo código y documentación destinados a duoOffice.
2. Los cambios de GenOffice se revisan como diferencias frente a la referencia fijada; no se fusionan de forma automática.
3. Cada lote aceptado debe tener una especificación, una rama de integración y una validación completa antes de incorporarse a `main`.
4. Las capas propias de duoOffice —privacidad, eliminación de GenSpark, rebranding, interfaz y distribución— prevalecen sobre los cambios upstream.
5. La procedencia y los avisos de licencia se conservan conforme a los requisitos aplicables de la base importada y de sus dependencias.

## Próxima acción

Importar este snapshot de GenOffice en una rama controlada y establecer su línea base de pruebas antes de modificar el producto.
