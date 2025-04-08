const { jsPDF } = window.jspdf;

const button = document.getElementById("pdf");

button.addEventListener("click", () => {
    const doc = new jsPDF();

    // Minimal working radio group
    const radio = new doc.AcroForm.RadioButton();
    radio.fieldName = "test";
    
    const opt1 = radio.createOption("yes");
    opt1.Rect = [50, 50, 15, 15];
    opt1.page = 0;
    
    const opt2 = radio.createOption("no");
    opt2.Rect = [50, 70, 15, 15];
    opt2.page = 0;
    
    doc.addField(radio);
    doc.save("minimal_radio.pdf");
})