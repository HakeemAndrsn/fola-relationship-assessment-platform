// Renders a DOM element to a multi-page A4 PDF and triggers a real file
// download, replacing the old window.print() "Save as PDF" workaround.
//
// Captures each top-level section of the report separately (rather than one
// giant screenshot sliced by raw pixel height) and packs them onto PDF pages
// without ever cutting a section across a page boundary, unless a single
// section is itself taller than one page — in which case that section falls
// back to internal slicing.

async function captureElement(
  html2canvas: typeof import("html2canvas")["default"],
  el: HTMLElement
) {
  return html2canvas(el, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
    windowWidth: el.scrollWidth,
    ignoreElements: (node) => node.classList?.contains("print:hidden"),
  });
}

export async function downloadElementAsPdf(elementId: string, filename: string): Promise<void> {
  const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);

  const container = document.getElementById(elementId);
  if (!container) {
    throw new Error(`Element #${elementId} not found`);
  }

  const sections = Array.from(container.children).filter(
    (child): child is HTMLElement => child instanceof HTMLElement && !child.classList.contains("print:hidden")
  );

  const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  let firstPage = true;
  let yCursor = 0;

  const elementsToCapture = sections.length > 0 ? sections : [container];

  for (const section of elementsToCapture) {
    const canvas = await captureElement(html2canvas, section);
    const imgData = canvas.toDataURL("image/jpeg", 0.95);
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    if (imgHeight <= pageHeight) {
      // Whole section fits on one page — start a fresh page if it doesn't
      // fit in the space remaining on the current one
      if (!firstPage && yCursor + imgHeight > pageHeight) {
        pdf.addPage();
        yCursor = 0;
      } else if (firstPage) {
        yCursor = 0;
      }
      pdf.addImage(imgData, "JPEG", 0, yCursor, imgWidth, imgHeight);
      yCursor += imgHeight;
      firstPage = false;
    } else {
      // Section itself is taller than a full page — give it its own
      // page(s) and fall back to slicing internally
      if (!firstPage) pdf.addPage();
      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      yCursor = pageHeight + heightLeft;
      firstPage = false;
    }
  }

  pdf.save(filename);
}
