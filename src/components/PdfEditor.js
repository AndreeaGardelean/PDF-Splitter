import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import '../style/pdfEditor.css';
import UtilitiesBar from './UtilitiesBar';
import PdfPreviewer from './PdfPreviewer';

/**
 * PdfEditor component puts together all the elements of the editor such as the utility bar and the PDF previewer.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.fileUrl - The URL of the PDF file to be rendered.
 *
 * @returns {JSX.Element|null} The rendered PDF document or null if no fileUrl is provided.
 */
export default function PdfEditor({ fileUrl }) {
  // const [fileUrl, setFileUrl] = useState(null);

  if (!fileUrl) {
    return null;
  }

	const selectedPages = new Set();
  var filename = '';
  var startRange = 0;
  var endRange = 0;

  function getPageRange() {
    const startRangeVal = document.getElementById('start-page').value;
    const endRangeVal = document.getElementById('end-page').value;

    startRange = startRangeVal || 0;
    endRange = endRangeVal || 0;

    for (let i = startRange; i <= endRange; i++) {
      selectedPages.add(parseInt(i));
    }
	}

	function getDocumentTitle() {
		const userDocName = document.getElementById('document-name-input').value;
		if (!userDocName) {
      filename = document.getElementById('filename').value;
      console.log('FILENAME ON UPLOAD', filename);
    } else {
      filename = userDocName;
    }
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
		const selectedPage = parseInt(e.target.id);
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
    getPageRange();
    getDocumentTitle();
    
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
		<div className="pdf-editor-container">
			<UtilitiesBar downloadHandler={() => handleFileEdit('download')} deleteHandler={() => handleFileEdit('delete')} />
			<PdfPreviewer fileUrl={fileUrl} handleCheckboxChange={handleCheckboxChange} />
		</div>
	);
}
