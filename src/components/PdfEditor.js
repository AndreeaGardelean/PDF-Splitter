import { useRef } from 'react';
import '../style/pdfEditor.css';
import UtilitiesBar from './UtilitiesBar';
import PdfPreviewer from './PdfPreviewer';

/**
 * PdfEditor component puts together all the elements of the editor such as the utility bar and the PDF previewer.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.fileUrl - The URL of the PDF file to be rendered.
 * @param {string} props.filename - The default name of the PDF file.
 *
 * @returns {JSX.Element|null} The rendered PDF editor or null if no fileUrl is provided.
 */
export default function PdfEditor({ fileUrl, filename }) {
	const startPageRef = useRef();
  const endPageRef = useRef();
  const documentNameInputRef = useRef();
	
	var selectedPages = new Set();
  var startRange = 0;
	var endRange = 0;
	var name = filename;

  if (!fileUrl) {
    return null;
  }

	/**
  * Retrieves the page range from the input fields and updates the selected pages.
  * If a valid range is provided, it overrides the manually selected pages.
  */
  function getPageRange() {
		const startRangeVal = startPageRef.current.value;
		const endRangeVal = endPageRef.current.value;

		if(!startRangeVal || endRangeVal) {
			return;
		}

    startRange = startRangeVal || 0;
		endRange = endRangeVal || 0;

		selectedPages = new Set();

    for (let i = startRange; i <= endRange; i++) {
      selectedPages.add(parseInt(i));
    }
	}

	/**
  * Retrieves the document title from the input field. 
  * If no custom title is provided, it uses the default filename.
  */
	function getDocumentTitle() {
		const userDocName = documentNameInputRef.current.value;
		if (userDocName) {
			name = userDocName + '.pdf';
		} else {
			name = filename;
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
		formData.append('fileName', JSON.stringify(name));

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
		console.log('FILE ', endpoint, 'clicked!!!!', selectedPages)

		// try to send data to the API and retrieve the response
		try {
			console.log('CONNECTING TO THE API')
			const request = await fetch(`http://127.0.0.1:5000/${endpoint}`, {
				method: 'POST',
				body: formData,
			});
			// get the response as a blob
			console.log('MADE THE REQUEST, GETTING THE REPSONSE')
			const response = await request.blob();
			console.log('RESPONSE', response)

			// return the response to the user by downloading a zip file with the file contents
			downloadFile(response);
		} catch (e) {
			console.error('Error during file page download', e);
		}
	}

	return (
		<div className="pdf-editor-container">
			<UtilitiesBar downloadHandler={() => handleFileEdit('download')} deleteHandler={() => handleFileEdit('delete')} startRef={startPageRef} endRef={endPageRef} fileRef={documentNameInputRef} />
			<PdfPreviewer fileUrl={fileUrl} handleCheckboxChange={handleCheckboxChange} />
		</div>
	);
}
