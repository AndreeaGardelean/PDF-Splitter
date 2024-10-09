import React from "react";
import '../style/input.css';

/**
 * Custom file picker for uploading PDF files.
 * @returns {JSX.Element} A styled file input component.
 */
export default function Input() {
  function filePicker() {
    document.getElementById("pdfFile")?.click();
  }

  return (
    <div className="picker-container">
      <div className="picker" onClick={filePicker}>Upload a PDF File...</div>
      <input type="file" id="pdfFile" name="pdfFile" accept=".pdf" />
    </div>
  );
}
