import downloadIcon from '../icons/download.svg';
import trashCanIcon from '../icons/trashCan.svg';
import '../style/utilitiesBar.css';
import Icon from './Icon';

/**
 * UtilitiesBar component renders a toolbar with utility icons for downloading
 * and deleting selected pages. It accepts handler functions as props for
 * handling these actions when the respective icons are clicked.
 *
 * @param {Object} props - Component properties.
 * @param {Function} props.downloadHandler - Function to be called when the download icon is clicked.
 * @param {Function} props.deleteHandler - Function to be called when the delete icon is clicked.
 *
 * @returns {JSX.Element} The rendered toolbar with download and delete icons.
 */
export default function UtilitiesBar({ downloadHandler, deleteHandler}) {

	return (
		<div className="utilities-bar">
			<div className='document-name'>
				<p>Document name:</p>
				<input id='document-name-input' type='text'></input>
			</div>

			<div className='page-range'>
				<p className='range-label'>Page :</p>
				<input className='range-input' id='start-page' type='number'></input>
				-
				<input className='range-input' id='end-page' type='number'></input>
			</div>

			<Icon className={"utilities-icon"} src={downloadIcon} altText={"Download Icon"} onClickHandler={downloadHandler} />
			<Icon className={"utilities-icon"} src={trashCanIcon} altText={"Trash Can Icon"} onClickHandler={deleteHandler} />
		</div>
	);
}
