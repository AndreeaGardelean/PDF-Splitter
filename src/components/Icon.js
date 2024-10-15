/**
 * The component displays an image with optional styling and a click handler.
 * The component is used to represent various icons in the application.
 *
 * @param {Object} props - The properties for the Icon component.
 * @param {string} props.src - The URL of the image to display.
 * @param {string} [props.className] - CSS class name to style the image.
 * @param {string} [props.altText] - Text that describes the image for accessibility.
 * @param {Function} [props.onClickHandler] - Function to call when the image is clicked.
 *
 * @returns {JSX.Element} The image element.
 */
export default function Icon({ src, className, altText, onClickHandler }) {
  return (
    <img
		  className={className}
			src={src}
			alt={altText}
			onClick={onClickHandler}
		/>
  )
}