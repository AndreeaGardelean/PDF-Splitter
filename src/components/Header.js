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
				<p className="greeting">Welcome to PDF Editor!</p>
				<p>
					To use the application, upload a PDF file and preview its content. Then, select the pages
					you want to either download or exclude from the original document. You can choose to
					download only the selected pages or generate a new PDF that excludes them. For more
					information see the
					<br></br>
					<a href="https://github.com/AndreeaGardelean/pdf-editor"> application notes</a>.
				</p>
			</header>
		</div>
	);
}
