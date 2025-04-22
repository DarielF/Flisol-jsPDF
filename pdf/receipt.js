const { jsPDF } = window.jspdf;

let totalPages = 0;
let year = new Date().getFullYear();
let month = new Date().getMonth();
let day = new Date().getDay();
const pdfName = `Recibo de pago -  ${day}/${month}/${year}`
let doc = new jsPDF({ format: 'a4', orientation: 'l' });
++totalPages;

const generate_receipt = () => {

    return doc.output('bloburl');
}

const pdfFile = generate_receipt();

export const bill = {
    file: pdfFile,
    totalPages: totalPages,
    fileName: pdfName,
    pdfObject: doc
}