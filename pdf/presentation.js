const { jsPDF } = window.jspdf;

let totalPages = 0;
const pdfName = "Presentación FliSol 2025"
let doc = new jsPDF({format:'a4',orientation:'l'});
++totalPages;

const generate_presentation = () =>{


    console.log(doc.getFontList())

    doc.text("Hello world", 20,50)
    return doc.output('bloburl');
}

const pdfFile = generate_presentation();

export const keynote = {
    file: pdfFile,
    totalPages: totalPages,
    fileName: pdfName,
    pdfObject: doc
}