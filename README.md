# PDF Splitter

*PDF-Splitter* is a web application designed for a small business I am working with to automate the generation of payslips. Currently, the business generates a single PDF file containing the payslips for all employees. This application allows to upload that single PDF file and split it into separate PDF files, representing each employee's payslip.

## Features
__Upload Single PDF__: Users can upload a multi-page PDF.

__Automatic Splitting__: The application processes the uploaded PDF to create individual PDF files for each page, representing a single payslip.

__Downloadable ZIP File__: The individual PDF files are zipped and made available for download as a single ZIP file.

## Technology Stack
*Backend*: Flask Framework

*Frontend*: React Library

*PDF Processing*: PyPDF2

*File Handling*: BytesIO, zipfile

## How It Works
*File Upload*: The user uploads a PDF file via the front-end interface (View).

*API Request*: Upon file upload, a POST request is sent to the Flask API containing the PDF file (View -> Controller).

*PDF Processing*: The API call the processing function to process the PDF file using the PyPDF2 library, creating separate PDF files for each page. These files are stored in a ZIP file using the BytesIO and zipfile libraries (Controller -> Model).

*Download*: Once processing is complete, the API responds with the ZIP file containing the individual payslips. The front-end then triggers a download of the ZIP file.

## Usage
Although the primary function of the application is to generate payslips, it can also be utilized to split any multi-page document into separate PDF files.

To access the application, visit:

## Contributing
Contributions are welcome! Please feel free to open an issue for any suggestions or improvements and we can work together.