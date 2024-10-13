from PyPDF2 import PdfReader, PdfWriter
from datetime import date
import zipfile 
from io import BytesIO

"""
Gets the current date and formats it from YYYY-MM-DD to DD-MM-YYYY.

Returns:
    str: The formatted date as a string in DD-MM-YYYY format.
"""
def getDate():
    today = date.today()
    return today.strftime('%d-%m-%Y')

"""
Splits a PDF file into individual pages, saves each page as a separate PDF file,
and stores them in a newly created ZIP file in memory using zipfile and BytesIO. 
The ZIP file is named with the prefix 'Payslips' followed by the current date in DD-MM-YYYY format.

Each new PDF file is named using the page number and the current date.

Args:
    file (BytesIO): The input PDF file to be split.

Returns:
    BytesIO: A BytesIO object containing the ZIP file with individual PDF pages.
"""
def splitPdf(file):
    inputPdf = PdfReader(file)
    totalPages = len(inputPdf.pages)

    zipBuffer = BytesIO()
    todayDate = getDate()

    with zipfile.ZipFile(file=zipBuffer, mode="w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as zipArchive:
        # iterate over each page of the pdf and create a pdf for each
        for page in range(totalPages):
            currPage = inputPdf.pages[page]
            filename = f"{page}-{todayDate}.pdf"

            outputPdf = PdfWriter()
            outputPdf.add_page(currPage)

            pdfBytes = BytesIO()
            outputPdf.write(pdfBytes)
            pdfBytes.seek(0)

            # write the PDF to the in-memory zip file
            zipArchive.writestr(filename, pdfBytes.read())

    zipBuffer.seek(0)
    return zipBuffer

"""
Generates a new PDF with selected pages from the input PDF file and compresses it into a ZIP archive. 
The function processes the input PDF, extracts the specified pages, compiles them into a new PDF, and 
returns the ZIP file containing this PDF.

Parameters:
    file: The input PDF file. It should be a file-like object that can be read by PyPDF2.
    pages: A list of page numbers to be extracted from the input PDF and 
                         added to the new PDF.
                    
Returns:
    BytesIO: A BytesIO object containing the ZIP file with the newly generated PDF.

"""
def downloadSelected(file, pages):
    inputPdf = PdfReader(file)
    zipBuffer = BytesIO()

    with zipfile.ZipFile(file=zipBuffer, mode="w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as zipArchive:
        filename = f"selected-{file.filename}"
        outputPdf = PdfWriter()

        # iterate over each page and if is in the selected pages add it to the PDF
        for page in pages:
            currPage = inputPdf.pages[int(page) - 1]
            outputPdf.add_page(currPage)

        pdfBytes = BytesIO()
        outputPdf.write(pdfBytes)
        pdfBytes.seek(0)

        # write the PDF to the in-memory zip file
        zipArchive.writestr(filename, pdfBytes.read())

    zipBuffer.seek(0)
    return zipBuffer

"""
Generates a new PDF containing only the non-selected pages from the input PDF file and compresses it into a ZIP archive. 
The function processes the input PDF, extracts the un-specified pages, compiles them into a new PDF, and 
returns the ZIP file containing this PDF.

Parameters:
    file: The input PDF file. It should be a file-like object that can be read by PyPDF2.
    pages: A list of page numbers to be removed from the input PDF.
                    
Returns:
    BytesIO: A BytesIO object containing the ZIP file with the newly generated PDF.

"""
def deleteSelected(file, pages):
    inputPdf = PdfReader(file)
    zipBuffer = BytesIO()
    deletePages = set(pages)
    totalPages = len(inputPdf.pages)

    with zipfile.ZipFile(file=zipBuffer, mode="w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as zipArchive:
        filename = f"deleted-{file.filename}"
        outputPdf = PdfWriter()

        # iterate over the PDF pages and add the un-selected pages to the new PDF
        for page in range(totalPages):
            if str(page + 1) not in deletePages:
                currPage = inputPdf.pages[int(page)]
                outputPdf.add_page(currPage)

        pdfBytes = BytesIO()
        outputPdf.write(pdfBytes)
        pdfBytes.seek(0)

        # write the PDF to the in-memory zip file
        zipArchive.writestr(filename, pdfBytes.read())

    zipBuffer.seek(0)
    return zipBuffer