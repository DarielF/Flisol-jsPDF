const { jsPDF } = window.jspdf;
import { keynote } from "./pdf/presentation.js"
import { fillableForm } from "./pdf/form.js";
import { bill } from "./pdf/receipt.js";
import * as pdfjsLib from "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.0.375/pdf.min.mjs"


pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.0.375/pdf.worker.mjs";
const print = document.getElementById("print");

const infoButton = document.getElementById("info");
const dialogWindow = document.getElementById("info-dialog");

const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll(':scope > [role="tab"]');
let pages = 1;
let tabID = 1;


const allPDFs = [keynote,fillableForm,bill];
let targetPDF = allPDFs[0];

print.addEventListener("click",()=>{

  targetPDF.pdfObject.save(targetPDF.fileName);
})


const PDFStart = nameRoute => {           
  let loadingTask = pdfjsLib.getDocument(nameRoute),
      pdfDoc = null,
      canvas = document.querySelector(`#pdf-viewer${tabID}`),
      ctx = canvas.getContext('2d'),
      scale = 1.5,
      numPage = 1;
      document.querySelector(`#tpages${tabID}`).innerHTML = pages;

      const GeneratePDF = numPage => {

          pdfDoc.getPage(numPage).then(page => {

              let viewport = page.getViewport({ scale: scale });
                  canvas.height = viewport.height;
                  canvas.width = viewport.width;
              
              let renderContext = {
                  canvasContext : ctx,
                  viewport:  viewport
              }

              page.render(renderContext);
          })
          document.querySelector(`#npages${tabID}`).innerHTML = numPage;

      }

       const PrevPage = () => {
           if(numPage === 1){
               return
           }
           numPage--;
           GeneratePDF(numPage);
       }

       const NextPage = () => {
           if(numPage >= pdfDoc.numPages){
               return
           }
           numPage++;
           GeneratePDF(numPage);
       }

       document.querySelector(`#prev${tabID}`).addEventListener('click', PrevPage)
       document.querySelector(`#next${tabID}`).addEventListener('click', NextPage )

       loadingTask.promise.then(pdfDoc_ => {
           pdfDoc = pdfDoc_;
           document.querySelector(`#npages${tabID}`).innerHTML = pdfDoc.numPages;
           GeneratePDF(numPage)
       });
}

const startPdf = () => {
  PDFStart(targetPDF.file);
}


window.addEventListener("DOMContentLoaded", () => {
  // Add a click event handler to each tab
  tabs.forEach((tab) => {
  tab.addEventListener("click", changeTabs);

  pages = targetPDF.totalPages;


  });

  document.querySelector(`#t${tabID}`).innerHTML = `
       <div>
                                    <button id="prev${tabID}">←</button>
                                    <button id="next${tabID}">→</button>
                                </div>
                                <canvas id="pdf-viewer${tabID}"></canvas>
                                <div class="status-bar">
                                    <p class="status-bar-field" id="npages${tabID}">not yet</p>
                                    <span> de </span>
                                    <p class="status-bar-field" id="tpages${tabID}"> not yet</p>
                                </div>
    `;
    startPdf();
});

infoButton.addEventListener("click",()=>{
  dialogWindow.style.display = "block";
  tabList.style.display = "none";
});

function closeInfoDialog(){
  dialogWindow.style.display = "none";
  tabList.style.display = "flex";
};

function changeTabs(e) {
  const targetTab = e.target;
  const tabList = targetTab.parentNode;
  const tabGroup = tabList.parentNode;

  tabList
    .querySelectorAll(':scope > [aria-selected="true"]')
    .forEach((t) => t.setAttribute("aria-selected", false));

  targetTab.setAttribute("aria-selected", true);

  tabGroup
    .querySelectorAll(':scope > [role="tabpanel"]')
    .forEach((p) => p.setAttribute("hidden", true));

  tabGroup
    .querySelector(`#${targetTab.getAttribute("aria-controls")}`)
    .removeAttribute("hidden");
  
    tabID = targetTab.getAttribute("id").slice(-1);

    targetPDF = allPDFs[tabID-1];
    pages = targetPDF.totalPages;

    document.querySelector(`#t${tabID}`).innerHTML = `
       <div>
                                    <button id="prev${tabID}">←</button>
                                    <button id="next${tabID}">→</button>
                                </div>
                                <canvas id="pdf-viewer${tabID}"></canvas>
                                <div class="status-bar">
                                    <p class="status-bar-field" id="npages${tabID}">not yet</p>
                                    <span> de </span>
                                    <p class="status-bar-field" id="tpages${tabID}"> not yet</p>
                                </div>
    `;
    
    
    
    startPdf();
}