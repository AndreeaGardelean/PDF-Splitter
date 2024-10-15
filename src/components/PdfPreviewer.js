import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import '../style/pdfPreviewer.css';

// PDF worker configuration
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

/**
 * PdfPreviewer component renders a PDF document from a given URL.
 * The component uses the `react-pdf` library to display PDF files. It supports
 * rendering multiple pages and provides a clean interface for viewing PDF documents.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.fileUrl - The URL of the PDF file to be rendered.
 * @param {Function} props.handleCheckboxChange - Function to handle checkbox selection.
 *
 * @returns {JSX.Element|null} The rendered PDF document or null if no fileUrl is provided.
 */
export default function PdfPreviewer({ fileUrl, handleCheckboxChange }) {
  const [pages, setPages] = useState();

  /**
	 * Handles the successful loading of the PDF document. 
	 * On success event, the total number of pages are retrieved from the event.
	 *
	 * @param {Object} param0 - Object containing document info.
	 * @param {number} param0.numPages - The number of pages in the loaded PDF document.
	 */
  function handleOnLoadSuccess({ numPages }) {
		setPages(numPages);
  }

  // return no component if a file URL is not provided
	if (!fileUrl) {
    return null;
  }

  return (
    <div className="pdf-previewer-container">
      <Document file={fileUrl} onLoadSuccess={handleOnLoadSuccess}>
        {Array.from(new Array(pages), (_el, index) => (
          <div className={'page-wrapper'} id={index + 1} key={`page-wrapper-${index + 1}`}>
            <div className="page-metadata">
              <input
                className="page-checkbox"
                type="checkbox"
                onChange={handleCheckboxChange}
                id={index + 1}
                key={`checkbox-${index + 1}`}
              />
              <p className="curr-page-number">
                {index + 1}/{pages}
              </p>
            </div>
            <Page
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className={'page'}
              pageNumber={index + 1}
              key={`page-${index + 1}`}
            />
          </div>
        ))}
      </Document>
    </div>
  );
}
