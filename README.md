# PDF Editor

**PDF Editor** is a user-friendly web application designed to help users modify existing PDFs by removing or selecting specific pages. It allows users to upload a PDF, preview its content, and either download selected pages or exclude specific pages from the final document.

## Features

**Upload Single PDF**: Upload a multi-page PDF document for editing.

**Preview PDF**: Preview the uploaded PDF directly in the application.

**Select Pages**: Use checkboxes to select individual pages for inclusion or exclusion.

**Delete Selected Pages**: Choose pages to exclude, and generate a new PDF without them.

**Download selected pages**: Download only the selected pages as a new PDF file.

**Downloadable ZIP File**: After processing, the edited PDF is packaged into a ZIP file for easy downloading.

## Technology Stack

**Backend**: Python, Flask

**Frontend**: React, CSS

**PDF Processing**: PyPDF2

**File Handling**: BytesIO, zipfile

## How It Works

**File Upload**: Users upload a PDF file through the front-end interface.

**File Preview**: The uploaded PDF file can be previewed on the screen.

**Page Selection**: Each page in the preview has a corresponding checkbox, allowing to select or deselect pages.

**Download Options**:

1. **Download Selected Pages**: Download a new PDF containing only the selected pages.

2. **Delete Selected Pages**: Download a new PDF with the selected pages excluded from the original document.

**API Request**: When a user clicks one of the action buttons (delete or download), the selected page data and the PDF are sent via a POST request to the Flask API.

**PDF Processing**: The backend processes the PDF using PyPDF2 to either include or exclude the selected pages. The resulting PDF is then zipped using BytesIO and zipfile libraries.

**Download**: Once processing is completed, the front-end triggers the download of the ZIP file containing the new PDF.

## Usage

To try out the application, visit: https://pdf-editor-um3i.onrender.com/

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or improvements, feel free to open an issue or submit a pull request. Let's collaborate to make this project better!
