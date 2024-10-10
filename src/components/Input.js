import React, { useState } from "react";
import '../style/input.css';
import paperclip from '../icons/paperclip.svg';

/**
 * Custom file picker for uploading PDF files.
 * @returns {JSX.Element} A styled file input component.
 */
export default function Input() {
  const [label, setLabel] = useState('Upload a PDF File...');
  const [btnContent, setBtnContent] = useState('Upload File');
  const [visibleFilename, setVisibleFilename] = useState('');

   /**
   * Triggers the click event for the hidden file input element, allowing users to select a file.
   */
  function filePicker() {
    document.getElementById("pdfFile")?.click();
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
      splitPdf(newFile);
    }
  }

  /**
   * Formats the current date as 'DD-MM-YYYY'.
   *
   * @returns {string} The formatted date string.
   */
  function getFormattedDate() {
    const date = new Date();
    const dateFormat = {
      day: String(date.getDate()).padStart(2, '0'),
      month: String(date.getMonth() + 1).padStart(2, '0'),
      year: date.getFullYear()
    }

    const zipName = `${dateFormat.day}-${dateFormat.month}-${dateFormat.year}`;
    
    return zipName;
  }

  /**
   * Sends the uploaded file to the API for processing. 
   * Receives a directory of split PDF files as a blob and triggers the download for the user.
   *
   * @param {File} file - The PDF file to be sent to the API.
   */
  async function splitPdf(file) {
    // create a FormData object to hold the file
    const formData = new FormData();
    formData.append('pdfFile', file);

    try {
      const request = await fetch('http://127.0.0.1:5000/split', {
        method: 'POST',
        body: formData
      })

      // get the response as a blob
      const response = await request.blob();
      const url = window.URL.createObjectURL(response);
      const link = document.createElement('a');
      document.body.appendChild(link);

      // download the received blob as a zip file
      const zipName = getFormattedDate();

      link.style = "display: none";
      link.href = url;
      link.download = `Payslips-${zipName}.zip`;
      link.click();
      window.URL.revokeObjectURL(url);

    } catch (e) {
      console.error('Error during file upload split', e);
    }
  }

  return (
    <div className="picker-container">
      <div className="picker" onClick={filePicker}>

        <div className={`filename ${visibleFilename}`}>
          <p>{ label }</p>
        </div>

        <div id="file-upload">
          <button className="upload-btn">
            <img id='paperclip-icon' src={paperclip} alt='Paper Clip Icon'></img>
            <span id='btn-text'>
              <span>{ btnContent }</span>
            </span>
          </button>
          <p id="drag-drop-txt">or drag and drop here</p>
        </div>
      </div>
      <input type="file" id="pdfFile" name="pdfFile" accept=".pdf" onChange={handleFileUpload} />
    </div>
  );
}