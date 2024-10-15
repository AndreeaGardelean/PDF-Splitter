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
	const filename = 'testFilename.pdf'

	/**
	 * Handles the successful loading of the PDF document. 
	 * On success event the total number of pages are retrieved from the event.
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
	}

	/**
	 * Creates and returns a FormData object containing the PDF file, selected pages, and provided file name.
	 *
	 * @returns {FormData} The FormData object with the appended values.
	*/
	function getFormData() {
		const formData = new FormData();
		formData.append('pdfFile', fileUrl);
		formData.append('selectedPages', JSON.stringify([...selectedPages]));
		formData.append('fileName', JSON.stringify(filename));

		return formData;
	}

	/**
	 * Triggers the download of a file from the response object.
	 * The response file is downloaded in a zip file with the name file.zip.
	 *
	 * @param {Blob} response - The response object containing the file to download.
	 */
	function downloadFile(response) {
		const url = window.URL.createObjectURL(response);
		const link = document.createElement('a');
		document.body.appendChild(link);

		link.style = 'display: none';
		link.href = url;
		link.download = `file.zip`;
		link.click();
		window.URL.revokeObjectURL(url);
	}

	/**
	 * Sends a PDF file and selected pages to the specified API endpoint for processing, 
	 * then downloads the resulting file as a ZIP archive on successful execution.
	 *
	 * @param {string} endpoint - The backend API endpoint where the file data is sent for processing. 
	 *                            This could be 'delete' or 'download'.
	 *
	 * @throws {Error} If the network request fails or there is an issue with the response, an error is caught and logged.
	 */
	async function handleFileEdit(endpoint) {
		// create a FormData object to hold the file
		const formData = getFormData();

		// try to send data to the API and retrieve the response
		try {
			const request = await fetch(`https://pdf-splitter-backend.onrender.com/${endpoint}`, {
				method: 'POST',
				body: formData,
			});
			// get the response as a blob
			const response = await request.blob();

			// return the response to the user by downloading a zip file with the file contents
			downloadFile(response);
		} catch (e) {
			console.error('Error during file page download', e);
		}
	}

	return (
		<div className="pdf-previewer-container">
			<UtilitiesBar downloadHandler={() => handleFileEdit('download')} deleteHandler={() => handleFileEdit('delete')} />
			<Document file={URL.createObjectURL(fileUrl)} onLoadSuccess={handleOnLoadSuccess}>
				{Array.from(new Array(pages), (_el, index) => (
					<div className={'page-wrapper'} id={index + 1} key={`page-wrapper-${index + 1}`}>
						<div className='page-metadata'>
							<input
								className="page-checkbox"
								type="checkbox"
								onChange={handleCheckboxChange}
								id={index + 1}
								key={`checkbox-${index + 1}`}
							/>
							<p className='curr-page-number'>{index + 1}/{pages}</p>
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
