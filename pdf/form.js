const { jsPDF } = window.jspdf;

let totalPages = 0;
const pdfName = "Formulario rellenable de Flisol"
let doc = new jsPDF({format:'a4',orientation:'l'});
++totalPages;

const generate_form = () =>{
    return doc.output('bloburl');
}

const pdfFile = generate_form();

export const fillableForm = {
    file: pdfFile,
    totalPages: totalPages,
    fileName: pdfName,
    pdfObject: doc
}