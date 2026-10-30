# Verificación del rediseño — 30 de octubre de 2026

## Ejecutado

Pruebas reales con Chrome headless local y Chrome DevTools Protocol, sin instalar librerías de navegador. Resultados detallados: .qa/results.json. Capturas de portada y página completa: .qa/viewport-375.png, .qa/viewport-1440.png, .qa/full-375.png y .qa/full-1440.png.

- Anchos 375, 390, 768, 1440 y 1920 px: scrollWidth igual a clientWidth; sin desbordamiento horizontal.
- En los cinco anchos: titulares de portada dentro del viewport, fuente local cargada, sin imágenes rotas, una única meta robots noindex, nofollow y navegación adaptada al ancho.
- Menú móvil: apertura, cierre con Escape y retorno de foco, cierre al pulsar fuera, navegación a Fragmentos y foco en el capítulo.
- Índice lateral de escritorio: desplazamiento hasta Encuéntranos.
- Preferencia de movimiento normal: revelado de un capítulo completado. Con movimiento reducido: scroll automático y revelados desactivados.
- JavaScript desactivado: índice móvil visible y sin desbordamiento horizontal.
- Visor con patrones sintéticos de QA: una colocación por imagen, apertura modal, siguiente/anterior con flechas, ampliación, cierre con Escape, retorno de foco y restauración del scroll.
- Se comprobó que los patrones de QA desaparecen al recargar la web real. Nunca se escribieron en imgs/ ni en photos.js.
- Sin excepciones JavaScript durante las pruebas.
- Capturas completas de escritorio y móvil inspeccionadas visualmente.
- Sintaxis JavaScript y referencias locales del HTML verificadas.

## Comparación de originalidad

Se leyeron estructura HTML y declaraciones tipográficas de ÁTICO CAHI, Hostal Mesón El Muro, Casa Celia, Casa El Campanario, Huerta San Miguel, Casa Almazara, La Terracita del Bosque, Azahares, Casa Sierra de Cádiz y La Casa del Muro. Fue una comparación de código, sin capturas de esos otros proyectos. Se sustituyen cabecera horizontal y portada panorámica por índice lateral y portada tipográfica escalonada. Space Grotesk no figura entre sus familias declaradas. Los estilos y las composiciones de Casa Mar se han escrito de nuevo; no se han copiado recursos de esos proyectos.

## Límites pendientes

- Fotografías incorporadas posteriormente: ver la actualización siguiente.
- Los patrones sintéticos verifican el motor del visor; no sustituyen la inspección de fotos reales ni acreditan la calidad de los recortes finales.
- No se ejecutó Safari ni un iPhone físico. Las comprobaciones móviles son emulación de viewport en Chrome. No se verificaron gestos en un dispositivo táctil real.
- Se conservan enlaces y datos verificados de la investigación anterior. No se realizó una reserva ni se comprobó disponibilidad o precios.

Solo se han escrito archivos dentro de apartamento-rural-casa-mar/. Los demás proyectos se consultaron en modo lectura. .gitignore se conserva y añade .qa/. Sin commits, pushes ni despliegues.


## Actualización: cinco fotografías locales incorporadas

Se han inspeccionado visualmente los cinco JPG de imgs/ y registrado en photos.js, con dimensiones reales y textos alternativos específicos. Portada: dormitorio. El espacio: salón. Fragmentos: patio del edificio, baño y azulejo de bienvenida. No se añaden servicios nuevos a partir de las fotografías. Se conservan todos los originales.

31 nuevas comprobaciones con Chrome: cinco imágenes distintas cargadas correctamente en 375, 390, 768, 1440 y 1920 px, tres fotos en el collage, sin avisos pendientes visibles con JavaScript activo, sin imágenes rotas, sin desbordamiento horizontal y una única meta robots. En 375 y 1440 px se ha comprobado apertura con foto real, siguiente, anterior por teclado, ampliación, cierre por Escape y retorno del foco. Sin excepciones JavaScript. Capturas completas con fotos de ambos anchos inspeccionadas visualmente. Resultados: .qa/photos-results.json. Capturas: .qa/photos-375.png y .qa/photos-1440.png.

Las pruebas anteriores con patrones sintéticos son históricas; esta actualización verifica los archivos reales. Sigue pendiente Safari en iPhone físico. Solo se han modificado archivos de apartamento-rural-casa-mar/; sin commits, pushes ni despliegues.

## Preparación para GitHub

Por petición posterior expresa del usuario, se prepara el primer commit y la subida del proyecto a https://github.com/pabloldl/casamarelbosque. Esto sustituye la restricción anterior de no hacer commits ni pushes para esta acción. Se mantiene noindex, nofollow y se excluyen los archivos de pruebas locales mediante .gitignore. No se configura un despliegue.
