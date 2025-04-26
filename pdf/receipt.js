const { jsPDF } = window.jspdf;

let totalPages = 0;
let year = new Date().getFullYear();
let month = new Date().getMonth() + 1;
let day = new Date().getDate();
const pdfName = `Recibo de pago -  ${day}/${month}/${year}`;
let doc = new jsPDF({ format: [70, 150], unit: 'mm', orientation: 'p' }); // recibo 70x150mm en portrait

let pdfFile;
let resolvePdfReady;
const pdfReadyPromise = new Promise(resolve => {
    resolvePdfReady = resolve;
});

// Arreglo actualizado de artículos con unidad de medida
const articulos = [
    { nombre: "Pan", cantidad: 1, unidad: "pieza", monto: 300.00  },
    { nombre: "Mayonesa", cantidad: 1, unidad: "frasco", monto: 950 },
    { nombre: "Paquete de pollo de 5 Kg", cantidad: 1, unidad: "paquete", monto: 4500 },
    { nombre: "Arroz", cantidad: 1, unidad: "kg", monto: 750 },
    { nombre: "Aceite", cantidad: 1, unidad: "litro", monto: 900 },
    { nombre: "Frijoles negros", cantidad: 1, unidad: "kg", monto: 650 },
    { nombre: "Ajo", cantidad: 1, unidad: "cabeza", monto: 180 }
];

const formatMoney = (num) => {
    return "$" + num.toFixed(2).replace('.', ',');
};

const generate_receipt = () => {
    doc.setFont("courier", "normal");
    doc.setFontSize(18);
    doc.text("Gil's", 25, 12);

    doc.setFontSize(8);
    doc.text("######################################", 5, 6);
    doc.text("######################################", 5, 18);

    // La fecha va al final, no aquí

    let y = 24;
    doc.setFontSize(8.5);
    doc.text("Artículo", 5, y);
    doc.text("Cant", 28, y);
    doc.text("Unidad", 35, y);
    doc.text("Monto", 48, y);
    y += 4;
    doc.setFontSize(8);
    doc.text("--------", 5, y);
    doc.text("----", 28, y);
    doc.text("------", 35, y);
    doc.text("-----", 48, y);

    y += 5;
    let gross = 0;

    articulos.forEach(item => {
        // Usar splitTextToSize para el nombre del artículo (máx 22mm de ancho)
        const nombreLines = doc.splitTextToSize(item.nombre, 22);
        nombreLines.forEach((linea, idx) => {
            doc.text(linea, 5, y + idx * 4);
        });
        doc.text(String(item.cantidad), 28, y);
        doc.text(item.unidad, 35, y);
        doc.text(formatMoney(item.monto), 50, y);

        gross += item.monto * item.cantidad;

        y += Math.max(nombreLines.length * 4, 6);
    });

    y += 4;
    doc.text("--------------------------------------", 5, y);

    // Cálculo del descuento
    const descuento = gross * 0.06;
    const totalFinal = gross - descuento;

    y += 6;
    doc.setFontSize(9);
    doc.text("TOTAL", 5, y);
    doc.text(formatMoney(gross), 48, y);
    y += 5;
    doc.text("DESCUENTO 6%", 5, y);
    doc.text("-" + formatMoney(descuento), 48, y);
    y += 5;
    doc.text("TOTAL FINAL", 5, y);
    doc.text(formatMoney(totalFinal), 48, y);
    doc.text("***", 25, y+5);

    y += 8;
    doc.setFontSize(8);
    doc.text("Pago realizado con tarjeta", 5, y);
    y += 4;
    doc.text("Banco Metropolitano", 5, y);

    // Añadir la fecha al final del recibo
    y += 6;
    doc.setFontSize(8.5);
    doc.text(`Fecha: ${day}/${month}/${year}`, 5, y);

    totalPages = doc.getNumberOfPages();
    return doc.output('bloburl');
};

pdfFile = generate_receipt();
resolvePdfReady();

export const bill = {
    file: pdfFile,
    totalPages: totalPages,
    fileName: pdfName,
    pdfObject: doc,
    ready: pdfReadyPromise
};