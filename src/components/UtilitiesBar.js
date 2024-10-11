import downloadIcon from '../icons/download.svg';
import trashCanIcon from '../icons/trashCan.svg';
import '../style/utilitiesBar.css';

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
export default function UtilitiesBar({ downloadHandler, deleteHandler }) {
	return (
		<div className="utilities-bar">
			<img
				className="utilities-icon"
				src={downloadIcon}
				alt="Download Icon"
				onClick={downloadHandler}
			/>
			<img
				className="utilities-icon"
				src={trashCanIcon}
				alt="Trash Can Icon"
				onClick={deleteHandler}
			/>
		</div>
	);
}
