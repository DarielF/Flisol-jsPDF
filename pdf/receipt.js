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

// Ejemplo de arreglo de artículos
const articulos = [
    { nombre: "T-Shirt XL", cantidad: 1, monto: 14.95, impuesto: 0.20 },
    { nombre: "Jeans PDK", cantidad: 2, monto: 39.90, impuesto: 0.20 },
    // Puedes agregar más artículos aquí
];

const formatMoney = (num) => {
    return "$" + num.toFixed(2).replace('.', ',');
};

const generate_receipt = () => {
    doc.setFont("courier", "normal");
    doc.setFontSize(18);
    doc.text("SHOP", 10, 12);

    doc.setFontSize(8);
    doc.text("######################################", 5, 6);
    doc.text("######################################", 5, 18);

    let y = 24;
    doc.setFontSize(9);
    doc.text("Article", 5, y);
    doc.text("Cnt", 38, y);
    doc.text("Amount", 46, y);
    doc.text("Tax", 62, y);
    y += 4;
    doc.setFontSize(8);
    doc.text("-------", 5, y);
    doc.text("---", 38, y);
    doc.text("------", 46, y);
    doc.text("---", 62, y);

    y += 5;
    let gross = 0;
    let tax = 0;

    articulos.forEach(item => {
        // Usar splitTextToSize para el nombre del artículo (máx 30mm de ancho)
        const nombreLines = doc.splitTextToSize(item.nombre, 30);
        nombreLines.forEach((linea, idx) => {
            doc.text(linea, 5, y + idx * 4);
        });
        doc.text(String(item.cantidad), 38, y);
        doc.text(formatMoney(item.monto), 46, y);
        doc.text((item.impuesto * 100).toFixed(0) + "%", 62, y);

        gross += item.monto * item.cantidad;
        tax += item.monto * item.cantidad * item.impuesto;

        y += Math.max(nombreLines.length * 4, 6);
    });

    y += 4;
    doc.text("--------------------------------------", 5, y);

    y += 6;
    doc.setFontSize(9);
    doc.text("GROSS", 5, y);
    doc.text(formatMoney(gross), 38, y);
    y += 5;
    doc.text("TAX", 5, y);
    doc.text(formatMoney(tax), 38, y);
    y += 5;
    doc.text("SUM", 5, y);
    doc.text(formatMoney(gross + tax), 38, y);
    doc.text("=====", 46, y);

    // Puedes agregar un código de barras o imagen aquí si lo deseas

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