from PyPDF2 import PdfReader, PdfWriter
from datetime import date
import zipfile 
from io import BytesIO

"""
Creates an in-memory BytesIO buffer to hold a ZIP file.

Returns:
    BytesIO: A buffer to store the ZIP file in memory.
"""
def createZipBuffer():
    return BytesIO()


"""
Writes a PDF file to an in-memory ZIP archive.

Args:
    zipArchive (ZipFile): The in-memory ZIP file object.
    pdf_writer (PdfWriter): The PdfWriter object containing the PDF data.
    filename (str): The name for the PDF file within the ZIP archive.
"""
def writePdfToZip(zipArchive, pdf_writer, filename):
    pdfBytes = BytesIO()
    pdf_writer.write(pdfBytes)
    pdfBytes.seek(0)
    zipArchive.writestr(filename, pdfBytes.read())

"""
Creates and returns a new PdfWriter object.

Returns:
    PdfWriter: A new PdfWriter instance.
"""
def createPdfWriter():
    return PdfWriter()


"""
Splits a PDF into individual pages and stores each page as a separate PDF in a ZIP archive.

Each page is saved with a filename in the format '{page-number}-{name}.pdf'. The ZIP archive 
is stored in memory and returned as a BytesIO object.

Args:
    file (BytesIO): The input PDF file to be split.
    name (str): The suffix for the split PDF filenames.

Returns:
    BytesIO: A buffer containing the ZIP file with individual PDFs for each page.
"""
def splitPdf(file, name):
    inputPdf = PdfReader(file)
    totalPages = len(inputPdf.pages)
    zipBuffer = createZipBuffer()

    with zipfile.ZipFile(file=zipBuffer, mode="w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as zipArchive:
        # iterate over each page of the pdf and create a pdf for each
        for page in range(totalPages):
            currPage = inputPdf.pages[page]
            filename = f"{page}-{name}.pdf"

            outputPdf = createPdfWriter()
            outputPdf.add_page(currPage)

            writePdfToZip(zipArchive, outputPdf, filename)

    zipBuffer.seek(0)
    return zipBuffer

"""
Generates a new PDF with selected pages from an input PDF and compresses it into a ZIP archive.

The function extracts the specified pages from the input PDF, compiles them into a new PDF,
and stores it in a ZIP archive, which is returned as a BytesIO object.

Args:
    file (BytesIO): The input PDF file.
    pages (list): A list of page numbers to include in the new PDF.
    filename (str): The filename for the newly generated PDF inside the ZIP archive.

Returns:
    BytesIO: A buffer containing the ZIP file with the generated PDF.
"""
def downloadSelected(file, pages, filename):
    inputPdf = PdfReader(file)
    zipBuffer = createZipBuffer()

    with zipfile.ZipFile(file=zipBuffer, mode="w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as zipArchive:
        outputPdf = createPdfWriter()

        # iterate over each page and if is in the selected pages add it to the PDF
        for page in pages:
            currPage = inputPdf.pages[int(page) - 1]
            outputPdf.add_page(currPage)

        writePdfToZip(zipArchive, outputPdf, filename)

    zipBuffer.seek(0)
    return zipBuffer

"""
Generates a new PDF with pages that are NOT selected and compresses it into a ZIP archive.

The function removes the specified pages from the input PDF, compiles the remaining pages into 
a new PDF, and stores it in a ZIP archive, which is returned as a BytesIO object.

Args:
    file (BytesIO): The input PDF file.
    pages (list): A list of page numbers to remove from the new PDF.
    filename (str): The filename for the newly generated PDF inside the ZIP archive.

Returns:
    BytesIO: A buffer containing the ZIP file with the generated PDF.
"""
def deleteSelected(file, pages, filename):
    inputPdf = PdfReader(file)
    zipBuffer = createZipBuffer()
    deletePages = set(pages)
    totalPages = len(inputPdf.pages)

    with zipfile.ZipFile(file=zipBuffer, mode="w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as zipArchive:
        outputPdf = PdfWriter()

        # iterate over the PDF pages and add the un-selected pages to the new PDF
        for page in range(totalPages):
            if (page + 1) not in deletePages:
                currPage = inputPdf.pages[int(page)]
                outputPdf.add_page(currPage)

        writePdfToZip(zipArchive, outputPdf, filename)

    zipBuffer.seek(0)
    return zipBuffer