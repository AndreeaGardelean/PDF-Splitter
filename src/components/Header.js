import '../style/header.css';

/**
 * Header component for the PDF Splitter application.
 * This component displays a welcome message and instructions 
 * for using the PDF splitter app. It includes a container 
 * with a header element that has a greeting message and instructions 
 * for uploading a PDF.
 *
 * @returns {JSX.Element} The rendered Header component.
 */
export default function Header() {
  return (
    <div className="header-container">
      <header className="header">
        <p className='greeting'>
          Welcome to PDF Splitter!
        </p>
        <p>
          To make use of this application, upload below a single PDF file and the app will break each page of the PDF file into a PDF file on its own.
        </p>
      </header>
    </div>
  )
}