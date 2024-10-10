import React, { useState } from "react";
import '../style/input.css';
import paperclip from '../icons/paperclip.svg';

/**
 * Custom file picker for uploading PDF files.
 * @returns {JSX.Element} A styled file input component.
 */
export default function Input() {
  const [label, setLabel] = useState('Upload a PDF File...');
  const [file, setFile] = useState();
  const [btnContent, setBtnContent] = useState('Upload File');
  const [visibleFilename, setVisibleFilename] = useState('');

  function filePicker() {
    document.getElementById("pdfFile")?.click();
  }

  function handleFileUpload(e) {
    const file = e.target.files?.[0];
    if (file) {
      setLabel(file.name);
      setFile(file);
      setBtnContent('Replace');
      setVisibleFilename('visible');
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
