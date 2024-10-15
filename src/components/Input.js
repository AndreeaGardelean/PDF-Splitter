import React, { useState, useEffect } from 'react';
import '../style/input.css';
import paperclip from '../icons/paperclip.svg';
import PdfEditor from './PdfEditor';

/**
 * Custom file picker for uploading PDF files.
 * @returns {JSX.Element} A styled file input component.
 */
export default function Input() {
	const [label, setLabel] = useState('Upload a PDF File...');
	const [btnContent, setBtnContent] = useState('Upload File');
	const [visibleFilename, setVisibleFilename] = useState('');
	const [fileUrl, setFileUrl] = useState('');

	/**
	 * Triggers the click event for the hidden file input element, allowing users to select a file.
	 */
	function filePicker() {
		document.getElementById('pdfFile')?.click();
	}

	/**
	 * Handles the file upload change event.
	 * Updates the component's state with the new file information and calls the API to process the uploaded file.
	 *
	 * @param {Event} e - The event object from the file input change event.
	 */
	function handleFileUpload(e) {
		const newFile = e.target.files?.[0];
		if (newFile) {
			setLabel(newFile.name);
			setBtnContent('Replace');
			setVisibleFilename('visible');
			setFileUrl(newFile);
		}
	}

	useEffect(() => {
		// Cleanup the URL object when the component unmounts or fileUrl changes
		return () => {
			if (fileUrl) {
				URL.revokeObjectURL(fileUrl);
			}
		};
	}, [fileUrl]);

	return (
		<div className="picker-container">
			<div className="picker" onClick={filePicker}>
				<div className={`filename ${visibleFilename}`}>
					<p id='filename'>{label}</p>
				</div>

				<div id="file-upload">
					<button className="upload-btn">
						<img id="paperclip-icon" src={paperclip} alt="Paper Clip Icon"></img>
						<span id="btn-text">
							<span>{btnContent}</span>
						</span>
					</button>
					<p id="drag-drop-txt">or drag and drop here</p>
				</div>
			</div>
			<input type="file" id="pdfFile" name="pdfFile" accept=".pdf" onChange={handleFileUpload} />
			<PdfEditor fileUrl={fileUrl} filename={label} />
		</div>
	);
}
