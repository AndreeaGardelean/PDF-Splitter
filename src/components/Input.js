import React, { useState } from "react";
import '../style/input.css';

/**
 * Custom file picker for uploading PDF files.
 * @returns {JSX.Element} A styled file input component.
 */
export default function Input() {
  const [label, setLabel] = useState('Upload a PDF File...');
  const [file, setFile] = useState();

  function filePicker() {
    document.getElementById("pdfFile")?.click();
  }

  function handleFileUpload(e) {
    const file = e.target.files?.[0];
    if (file) {
      setLabel(file.name);
      setFile(file);
    }
  }

  return (
    <div className="picker-container">
      <div className="picker" onClick={filePicker}>{ label }</div>
      <input type="file" id="pdfFile" name="pdfFile" accept=".pdf" onChange={handleFileUpload} />
    </div>
  );
}
