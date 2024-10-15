import { useState, useEffect } from 'react';
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
export default function UtilitiesBar({ downloadHandler, deleteHandler, setStartPage, setEndPage}) {

	function onPageStartChange(e) {
		const value = e.target.value;
		setStartPage(value);
	}

	function onPageEndChange(e) {
		const value = e.target.value; 
		setEndPage(value);
	}

	return (
		<div className="utilities-bar">
			<div className='page-range'>
				<p className='range-label'>Page :</p>
				<input className='range-input' id='start-page' type='number' onChange={onPageStartChange}></input>
				-
				<input className='range-input' id='end-page' type='number' onChange={onPageEndChange}></input>
			</div>
			<Icon className={"utilities-icon"} src={downloadIcon} altText={"Download Icon"} onClickHandler={downloadHandler} />
			<Icon className={"utilities-icon"} src={trashCanIcon} altText={"Trash Can Icon"} onClickHandler={deleteHandler} />
		</div>
	);
}
