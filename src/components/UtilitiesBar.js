import downloadIcon from '../icons/download.svg';
import trashCanIcon from '../icons/trashCan.svg';
import '../style/utilitiesBar.css';
import Icon from './Icon';


/**
 * UtilitiesBar component renders a toolbar with utility icons for downloading
 * and deleting selected pages. It also includes inputs for specifying a file name
 * and a page range.
 *
 * @param {Object} props - Component properties.
 * @param {Function} props.downloadHandler - Function to be called when the download icon is clicked.
 * @param {Function} props.deleteHandler - Function to be called when the delete icon is clicked.
 * @param {Object} props.fileRef - React ref for the file name input field, used to access the document name without re-rendering the parent component.
 * @param {Object} props.startRef - React ref for the start page input field, used to access the start value of the page selection range.
 * @param {Object} props.endRef - React ref for the end page input field, used to access the end value of the page selection range.
 *
 * @returns {JSX.Element} The rendered toolbar with download and delete icons, and input fields for file name and page range.
 */
export default function UtilitiesBar({ downloadHandler, deleteHandler, startRef, endRef, fileRef}) {

	return (
		<div className="utilities-bar">
			<div className='document-name'>
				<p>Document name:</p>
				<input ref={fileRef} id='document-name-input' type='text'></input>
			</div>

			<div className='page-range'>
				<p className='range-label'>Page :</p>
				<input ref={startRef} className='range-input' id='start-page' type='number'></input>
				-
				<input ref={endRef} className='range-input' id='end-page' type='number'></input>
			</div>

			<Icon className={"utilities-icon"} src={downloadIcon} altText={"Download Icon"} onClickHandler={downloadHandler} />
			<Icon className={"utilities-icon"} src={trashCanIcon} altText={"Trash Can Icon"} onClickHandler={deleteHandler} />
		</div>
	);
}
