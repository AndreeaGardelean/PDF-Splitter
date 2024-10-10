from PyPDF2 import PdfReader, PdfWriter
import os
from datetime import date

"""
Gets the current date and formats it from YYYY-MM-DD to DD-MM-YYYY.

Returns:
    str: The formatted date as a string in DD-MM-YYYY format.
"""
def getDate():
    today = date.today()
    return today.strftime('%d-%m-%Y')

"""
Creates a directory with the given name.

Args:
    directoryName (str): The name of the directory to create.

Raises:
    PermissionError: If the user doesn't have permission to create the directory.
    Exception: Catches any other exceptions that may occur during directory creation.
"""
def createDirectory(directoryName):
    try:
        os.mkdir(directoryName)
    except PermissionError:
        print('Unable to create directory. Reason: PERMISSION DENIED')
    except Exception as e:
        print(f"An error occurred: {e}")

"""
Extracts and returns the name of the employee from a given PDF page.

Args:
    page (PyPDF2.PageObject): The page of the PDF from which to extract the employee's name.

Returns:
    str: The extracted name of the employee (or any available text from the page).
"""
def findEmployeeName(page):
    name = page.extract_text()
    return name

"""
Splits a PDF file into individual pages, saves each page as a separate PDF file,
and stores them in a newly created directory. The directory is named with the prefix
'Payslips' followed by the current date in DD-MM-YYYY format.

Each new PDF file is named using the page number and the current date.

Raises:
    FileNotFoundError: If the input PDF file doesn't exist.
    Exception: Catches any other exceptions that may occur during the PDF processing.
"""
def splitPdf(filepath):
    with open(filepath, "rb") as inputPdfFile:
        inputPdf = PdfReader(inputPdfFile)
        totalPages = len(inputPdf.pages)
        todayDate = getDate()
        directoryName = 'Payslips ' + todayDate

        createDirectory(directoryName)

        # iterate over each page of the pdf and create a pdf for each
        for page in range(totalPages):
            currPage = inputPdf.pages[page]
            
            filename = f"{page}-{todayDate}.pdf"
            findEmployeeName(currPage)

            outputPdf = PdfWriter()
            outputPdf.add_page(currPage)

            outputPdfPath = os.path.join(directoryName, filename)
            with open(outputPdfPath, "wb") as outputPdfFile:
                outputPdf.write(outputPdfFile)