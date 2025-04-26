const { jsPDF } = window.jspdf;

let totalPages = 1;
const pdfName = "Formulario rellenable de Flisol";
let doc = new jsPDF({ format: 'a4', orientation: 'p' });
let pdfFile;
let resolvePdfReady;
const pdfReadyPromise = new Promise(resolve => {
    resolvePdfReady = resolve;
});

// Cargar el logo de Flisol
const logoImg = new Image();
logoImg.src = './resources/flisol-logo.png'; // Asegúrate de tener el logo en esta ruta

logoImg.onload = () => {
    pdfFile = generate_form();
    fillableForm.file = pdfFile;
    fillableForm.totalPages = totalPages;
    resolvePdfReady();
};

function generate_form() {
    // Fondo gris para secciones


    doc.line(70, 10, 70, 35);
    // Logo y título
    doc.addImage(logoImg, 'PNG', 20, 10, 45, 25);
    doc.setFontSize(20);
    doc.text("Formulario para ponencias", 75, 18);
    doc.setFontSize(16);
    doc.text("Flisol 2025", 75, 26);
    doc.text("Cuba", 75, 34);

    // Sección Datos Personales
    doc.setFillColor('c0c0c0');
    doc.rect(10, 40, 190, 45, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Datos Personales", 15, 48);

    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text("Nombre y Apellidos:", 15, 56);
    doc.text("¿Estás en Cuba?", 15, 64);

    // Opciones de RadioButton: Sí y No (debajo de la pregunta)
    let radioSi = new doc.AcroForm.RadioButton();
    radioSi.T = "enCuba";
    radioSi.V = "si";
    radioSi.Rect = [25, 68, 5, 5]; // Debajo de la pregunta
    radioSi.AS = "si"; // Seleccionado por defecto
    doc.addField(radioSi);
    doc.text("Sí", 32, 72);

    let radioNo = new doc.AcroForm.RadioButton();
    radioNo.T = "enCuba";
    radioNo.V = "no";
    radioNo.Rect = [55, 68, 5, 5]; // Debajo de la pregunta, separado
    doc.addField(radioNo);
    doc.text("No", 62, 72);
    doc.text("Género:", 132, 68);
    doc.text("Correo:", 15, 81);

    // Campo de texto: Nombre y Apellidos
    let nombreField = new doc.AcroForm.TextField();
    nombreField.Rect = [62, 51, 110, 7];
    nombreField.T = "nombre";
    nombreField.maxLength = 50;
    nombreField.multiline = false;
    nombreField.value = "Escriba su nombre y apellidos aqui. . .";
    doc.addField(nombreField);

    // Grupo de RadioButton: ¿Estás en Cuba?


    // ComboBox: Género
    let generoField = new doc.AcroForm.ComboBox();
    generoField.Rect = [152, 62, 42, 8];
    generoField.T = "genero";
    // Usa setOptions si está disponible, si no, asigna directamente
    if (typeof generoField.setOptions === "function") {
        generoField.setOptions(["Masculino", "Femenino", "Otro"]);
    } else {
        generoField.options = ["Masculino", "Femenino", "Otro"];
    }
    generoField.V = "(Seleccione)"; // Valor inicial para que se muestre desplegable
    doc.addField(generoField);

    // Campo de texto: Correo
    let correoField = new doc.AcroForm.TextField();
    correoField.Rect = [35, 76, 90, 7];
    correoField.T = "correo";
    correoField.multiline = false;
    doc.addField(correoField);

    // Sección Sobre la ponencia
    doc.setFillColor('c0c0c0');
    doc.rect(10, 90, 190, 45, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text("Sobre la ponencia", 15, 98);

    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text("Título:", 15, 106);
    let tituloField = new doc.AcroForm.TextField();
    tituloField.Rect = [58, 102, 135, 7];
    tituloField.T = "titulo";
    doc.addField(tituloField);

    doc.text("Breve descripción:", 15, 116);
    let descField = new doc.AcroForm.TextField();
    descField.Rect = [58, 112, 135, 18];
    descField.T = "descripcion";
    descField.multiline = true;
    descField.maxLength = 140;
    doc.addField(descField);

    // Sección Notas
    doc.setFillColor('c0c0c0');
    doc.rect(10, 140, 150, 40, 'F');
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text("Notas", 15, 148);
    let notasField = new doc.AcroForm.TextField();
    notasField.Rect = [15, 153, 130, 20];
    notasField.T = "notas";
    notasField.maxLength = 200;
    notasField.value = "(Escriba aquí lo que pueda ser de interés para los revisores.)"
    notasField.multiline = true;
    doc.addField(notasField);

    totalPages = doc.getNumberOfPages();
    return doc.output('bloburl');
}

// Exportar el objeto fillableForm
export const fillableForm = {
    file: undefined,
    totalPages: totalPages,
    fileName: pdfName,
    pdfObject: doc,
    ready: pdfReadyPromise
};