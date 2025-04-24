const { jsPDF } = window.jspdf;

let totalPages = 0;
let newCmdLinePos = [122,67] //par de coordenadas [x,y] para cuando se quiera escribir un comando en el dibujo de la consola
const pdfName = "Presentación FliSol 2025"
let doc = new jsPDF({format:'a4',orientation:'l', unit: 'mm'});
++totalPages;

const generate_presentation = () =>{

    console.log(doc.getFontList())

    draw_console();
   
    addNewConsolePage();
    doc.setTextColor('ffffff');
    doc.text('uname -a',newCmdLinePos[0],newCmdLinePos[1]);
    
    addNewConsolePage();
    doc.setTextColor('ffffff');
    doc.text('uname -a',newCmdLinePos[0],newCmdLinePos[1]);
    newLineConsole(80)
    doc.setFont('courier','bold');
    doc.text('Dariel Delgado -- jsPDF | Sab Abr 26 ',29,74);

    addNewConsolePage();
    doc.setTextColor('ffffff');
    doc.text('flisol start',newCmdLinePos[0],newCmdLinePos[1]);

    //-------------------------------------------
    addNewConsolePage();
    doc.setTextColor('ffffff');
    doc.setFont('courier','bold');
    doc.setFontSize(25)
    doc.text("¿Qué es jsPDF?",50,79)

    doc.setLineDashPattern([2],1);
    doc.setDrawColor('ffffff');
    doc.rect(54,85,160,80);
    
    doc.setFont('courier','bold');
    doc.setFontSize(25);
    doc.text("jsPDF es una librería de javascipt para generar documentos PDF",58,95,{maxWidth: 155});

    //-------------------------------------------
    addNewConsolePage();
    doc.setTextColor('ffffff');
    doc.setLineDashPattern([2],1);
    doc.setDrawColor('ffffff');
    doc.text('man jsPDF',newCmdLinePos[0],newCmdLinePos[1]);
    doc.rect(54,85,160,15);
    doc.setFont('courier','bold');
    doc.setFontSize(25);
    doc.text("npm install jspdf",58,95);
    doc.setDrawColor('ffffff');
    doc.rect(54,115,205,15);
    doc.setFontSize(15);
    doc.text('<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/3.0.1/jspdf.umd.min.js"></script>',55,121,{maxWidth:205});
    
    //-------------------------------------------
    addNewConsolePage();
    doc.setTextColor('ffffff');
    doc.text('man jsPDF',newCmdLinePos[0],newCmdLinePos[1]);
    doc.rect(54,85,160,80);
    doc.setFont('courier','bold');
    doc.text(`new jsPDF({
        orientation: 'p' | 'l',
        format: number| string,
        unit: 'px'| 'mm' | 'in' | 'cm'      
    });`,60, 100);

    //-------------------------------------------

    addNewConsolePage();
    doc.setTextColor('ffffff');
    doc.text('man jsPDF',newCmdLinePos[0],newCmdLinePos[1]);
    doc.rect(54,85,160,80);
    doc.setFont('courier','bold');
    doc.text("> Textos: fuente, tamaño, color, estilo",58,95);
    doc.text("> Formas geométricas: criculos, rectangulos, líneas, elipses, triángulos",58,104, {maxWidth: 155});
    doc.text("> Añadir imágenes",58,122);
    doc.text("> Guardar en formato PDF",58,131);

    //-------------------------------------------
    addNewConsolePage();
    doc.setTextColor('ffffff');
    doc.text('man jsPDF',newCmdLinePos[0],newCmdLinePos[1]);
    doc.rect(54,85,160,80);
    doc.setFont('courier','bold');
    doc.text("> Calculo de espacios de caracteres (ver Módulo split_text_to_size)",58,95,{maxWidth: 155});
    doc.text("> Manejo de Metadata",58,112, {maxWidth: 155});
    doc.text("> Manejar PDF cacheado en distintos formatos binarios o codificados",58,122,{maxWidth: 155});
    doc.text("> Formularios rellenables",58,138);

    
    return doc.output('bloburl');
}

const draw_console = () => {
     //consola de Ubuntu
     doc.setFont('helvetica','bold')
     doc.setFillColor('5c1644');
     doc.roundedRect(25,50,250,140,2,1.5,'F');
     doc.setFillColor('4b4943');
     doc.roundedRect(25,50,250,10,2,1.5,'F');
 
     doc.setFillColor('d85425');
     doc.circle(30,55,3,'F');
 
     doc.setFillColor('82827c');
     doc.circle(38,55,3,'F');
 
     doc.setFillColor('82827c');
     doc.circle(46,55,3,'F');
 
     doc.setFontSize(15);
     doc.setTextColor(255,255,255);
     doc.text('Flisol - 2025',55,57);
    
     newLineConsole(67);

     doc.setTextColor('0000000');

}

const newLineConsole = (y) =>{
    doc.setFontSize(18);
    doc.setTextColor('5b8016');
    doc.text('darieldelgado@Flisol2025',29,y);
    doc.setFontSize(18);
    doc.setTextColor('ffffff');
    doc.text(':',107,y);
    doc.text('~',110,y);
    doc.text('$',115,y);
}
const addNewConsolePage = () => {
    doc.addPage();
    ++totalPages;
    draw_console();
}

const pdfFile = generate_presentation();

export const keynote = {
    file: pdfFile,
    totalPages: totalPages,
    fileName: pdfName,
    pdfObject: doc
}