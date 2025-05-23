# Presentación FLISoL 2025: Generación de PDFs con jsPDF

Este repositorio contiene la presentación y ejemplos prácticos para la ponencia sobre **jsPDF** en el [Festival Latinoamericano de Instalación de Software Libre (FLISoL) 2025](https://flisol.dev). El objetivo es mostrar, de manera interactiva y didáctica, cómo utilizar la biblioteca jsPDF para generar documentos PDF desde JavaScript, abarcando desde su instalación hasta casos de uso un poco más avanzados.


## ¿Qué es jsPDF?

[jsPDF](https://github.com/parallax/jsPDF) es una biblioteca de JavaScript que permite crear archivos PDF directamente desde el navegador o desde aplicaciones web. Es ampliamente utilizada para generar reportes, facturas, formularios y presentaciones en formato PDF sin depender de servidores externos.


## Estructura del Proyecto
El proyecto sólo usa HTML5, CSS y JavaScript sin ningún tipo de framework o biblioteca gráfica (Vanilla)
Está organizado de la siguiente manera:

- **index.html**: Página principal de la presentación, con pestañas para navegar entre los diferentes ejemplos (presentación, formulario rellenable y comprobante de pago).
- **main.js**: Controla la lógica de navegación entre pestañas y la visualización de los PDFs generados.
- **pdf/presentation.js**: Código fuente de la presentación principal en PDF, generada dinámicamente con jsPDF.
- **pdf/form.js**: Ejemplo de formulario PDF rellenable, mostrando el uso de campos interactivos (texto, radio, combo).
- **pdf/receipt.js**: Ejemplo de comprobante de pago generado automáticamente.
- **modules_acroform.js**: Módulo para el manejo de formularios PDF (AcroForm) con jsPDF.
- **resources/**: Imágenes y recursos utilizados en la presentación (incluye el logo de FLISoL).


## ¿Cómo usar este proyecto?

1. **Clona el repositorio** y abre `index.html` en tu navegador.
2. Navega entre las pestañas para ver:
   - La presentación principal (en formato PDF interactivo).
   - Un formulario PDF rellenable.
   - Un comprobante de pago generado automáticamente.
3. Puedes descargar cada PDF generado usando el botón de impresión.

**Requisitos:**
- Navegador moderno (Chrome, Firefox, Edge, etc.).
- No se requiere instalación de dependencias adicionales, ya que jsPDF y PDF.js se cargan desde CDN.

## Instalación de jsPDF

Si deseas usar jsPDF en tus propios proyectos, puedes instalarlo fácilmente con npm:

```bash
npm install jspdf
```

O incluirlo directamente en tu HTML:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/3.0.1/jspdf.umd.min.js"></script>
```

## Bibliotecas utilizadas

- **jsPDF**: Biblioteca principal para la generación de PDFs en JavaScript.
  [Repositorio en GitHub](https://github.com/parallax/jsPDF)

- **PDF.js**: Se utilizó para hacer el pequeño visualizador de PDFs.  
  [Repositorio en GitHub](https://github.com/mozilla/pdf.js)

- **98.css**: El estilo retro se consiguió con una biblioteca de css.  
  [Repositorio en GitHub](https://github.com/jdan/98.css)

## Funcionalidades demostradas
- Creación de PDFs desde cero.
- Personalización de fuentes, colores, estilos y geometría.
- Inserción de imágenes.
- Generación de formularios PDF interactivos (AcroForm).
- Ejemplo de recibo/factura con cálculos automáticos.
- Visualización y navegación de PDFs en el navegador usando PDF.js.

## Recomendaciones y buenas prácticas
- Optimiza el tamaño de las imágenes antes de insertarlas en el PDF para evitar archivos pesados.
- Utiliza fuentes estándar para asegurar compatibilidad en todos los visores PDF.
- Valida los datos antes de generar documentos finales, especialmente en formularios.
- Consulta la documentación oficial de jsPDF para explorar todas las opciones avanzadas.

## Créditos y contacto
- Agradecimientos: [Euri Luis](https:///t.me/MayariMontSRL)

## Contribuciones y aviso

Este es un repositorio **educativo** y su propósito es únicamente servir como ejemplo para mostrar el uso de jsPDF en el contexto de la ponencia de FLISoL 2025.  
Si tienes alguna sugerencia, encuentras un problema o deseas mejorar algún aspecto, ¡estoy abierto a recibir Pull Requests (PR)!  
También puedes dejar un [issue en GitHub](https://github.com/tu_usuario/flisol2025-jspdf/issues) y con gusto lo revisaré.
