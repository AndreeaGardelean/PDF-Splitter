import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import '../style/pdfPreviewer.css';
import UtilitiesBar from './UtilitiesBar';

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
 *
 * @returns {JSX.Element|null} The rendered PDF document or null if no fileUrl is provided.
 */
export default function PdfPreviewer({ fileUrl }) {
	const [pages, setPages] = useState();
	const selectedPages = new Set();

	/**
	 * Handles the successful loading of the PDF document.
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

	/**
	 * Handles checkbox selection for each page of the PDF.
	 * This function adds the selected page to the `selectedPages` set if it is not already present,
	 * or removes it from the set if it has been previously selected.
	 *
	 * @param {Event} e - The event object from the checkbox input.
	 *                    The `id` of the checkbox corresponds to the page number.
	 */
	function handleCheckboxChange(e) {
		const selectedPage = e.target.id;

		if (selectedPages.has(selectedPage)) {
			selectedPages.delete(selectedPage);
		} else {
			selectedPages.add(selectedPage);
		}
		console.log(selectedPages);
	}

	/**
	 * Handles the download of selected pages from the PDF.
	 * This function triggers the process of downloading only the pages
	 * that have been selected by the user.
	 */
	function handleSelectedDownload() {
		console.log('downloading selected pages');
	}

	/**
	 * Handles the deletion of selected pages from the PDF.
	 * This function removes the pages that have been selected by the user
	 * for deletion.
	 */
	function handleDeletePages() {
		console.log('deleted selected pages');
	}

	return (
		<div className="pdf-previewer-container">
			<UtilitiesBar downloadHandler={handleSelectedDownload} deleteHandler={handleDeletePages} />
			<Document file={fileUrl} onLoadSuccess={handleOnLoadSuccess}>
				{Array.from(new Array(pages), (_el, index) => (
					<div className={'page-wrapper'} id={index + 1} key={`page-wrapper-${index + 1}`}>
						<input
							className="page-checkbox"
							type="checkbox"
							onChange={handleCheckboxChange}
							id={index + 1}
							key={`checkbox-${index + 1}`}
						/>
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
