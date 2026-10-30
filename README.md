# Casa Mar — A different point of view

Web local HTML5, CSS3 y JavaScript vanilla. Abrir index.html con Live Server. Sin compilación ni dependencias de ejecución.

## Nueva dirección creativa

Se han reemplazado íntegramente el HTML de presentación, los estilos y los comportamientos de la versión anterior:

- Índice lateral fijo en escritorio; cabecera compacta con menú desplegable real en móvil. Sin JavaScript, el índice móvil queda visible.
- Portada editorial amarilla, nombre en dos líneas desplazadas y pieza fotográfica fuera del eje central cuando haya originales.
- Capítulos con tratamientos distintos: composición desplazada para El espacio, collage para Fragmentos, ficha tipográfica compacta, código postal para El lugar y cierre negro con dirección y reserva.
- Amarillo mantequilla #F5E6A5, negro #181818, blanco roto #F7F5EF y verde azulado #356D65. Se elimina la paleta anterior.
- Space Grotesk variable alojada localmente. Licencia SIL OFL en fonts/OFL.txt. Fuente: repositorio oficial google/fonts, ofl/spacegrotesk.
- Revelado de fotos con máscara y aparición lateral discreta de titulares. Sin interceptar el scroll; se respeta prefers-reduced-motion.

## Fotografías incorporadas

Se han revisado e incorporado las cinco fotografías que el usuario ha facilitado en imgs/:

- 765301277.jpg: dormitorio, seleccionado para la portada por su iluminación y composición.
- 765287208.jpg: salón, en el capítulo El espacio.
- 625791451.jpg: patio del edificio, en Fragmentos.
- 765287717.jpg: baño, en Fragmentos.
- 625791541.jpg: detalle de bienvenida, en Fragmentos.

Todas son verticales. Se conservan sus proporciones completas y sus originales JPG de 38 a 113 KB, sin añadir versiones de mayor resolución artificial. No se generan variantes adicionales porque los originales ya son pequeños (526–576 × 768 px). El salón se limita a 576 px de ancho en escritorio. No se repiten imágenes en la página; el visor permite ampliarlas. photos.js registra dimensiones y descripciones específicas. Los avisos de fotografías pendientes se sustituyen automáticamente al cargar los archivos.

El visor se ha comprobado con las fotografías reales en escritorio y móvil emulado: apertura, siguiente, anterior con teclado, ampliación, Escape y retorno del foco. Las nuevas pruebas y capturas están en .qa/photos-results.json y .qa/photos-375.png / photos-1440.png.

## Datos conservados de la investigación anterior

- Booking: https://www.booking.com/hotel/es/apartamento-rural-casa-mar.es.html
- Contraste de dirección y distribución: https://www.ruralgia.com/apartamento-rural-casa-mar-h-13265821
- Contraste de capacidad: https://www.google.com/travel/hotels/entity/CiQIk9n04OvCmoRFEPHNnMKF3_631QEaDS9nLzExbmJ6cHk4NWoQAg
- Información de El Bosque: https://www.cadizturismo.com/es/municipios/el-bosque

Se mantienen nombre, Plaza el Andén 2, 11670 El Bosque, hasta seis personas, dos dormitorios, un baño, cocina equipada, aire acondicionado, WiFi, ropa de cama y toallas. Registro VTAR/CA/04825. No se han añadido servicios ni contactos nuevos. No se muestran precios, disponibilidad o formularios de reserva. Google Maps abre una búsqueda por nombre y dirección, no una posición exacta validada sobre el mapa. La investigación anterior encontró un bloqueo de verificación JavaScript al abrir Booking directamente; no se eludió.

## Validación

Ver VERIFICACION.md. Se mantiene una única meta robots noindex, nofollow. Todos los archivos escritos durante este rediseño están en apartamento-rural-casa-mar/. Las capturas y el informe técnico local están en .qa/, ignorada por Git. No hay servidor de pruebas activo al finalizar.



## Repositorio

Código fuente: https://github.com/pabloldl/casamarelbosque

La subida al repositorio fue solicitada expresamente por el usuario después del desarrollo local. Se conserva noindex, nofollow en index.html y se excluye .qa/. Subir el código no configura por sí mismo un despliegue o GitHub Pages.
