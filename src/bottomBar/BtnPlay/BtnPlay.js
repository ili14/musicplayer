import React from "react";
import styles from "./BtnPlay.module.scss";
import gramophoneDiscIcon from "../../assets/icons/garmaphone-disc.png";
import playIcon from "../../assets/icons/play.png";
import pauseIcon from "../../assets/icons/pause.png";
import PropTypes from "prop-types";

function BtnPlay(props) {
	const gramophoneIconRef = React.useRef();

	React.useEffect(() => {
		if (props.isPlaying == true) {
			const animInterval = setInterval(() => {
				if (props.isPlaying == true) {
					let rotate = gramophoneIconRef.current.style.rotate;
					rotate = rotate.replace("deg", "");
					rotate = String(Number(rotate.replace("deg", "")) + 1) + "deg";
					if (rotate === "360deg") rotate = "0deg";
					gramophoneIconRef.current.style.rotate = rotate;
					gramophoneIconRef.current.style.transform = `rotate(${rotate})`;
				}
			}, 10);
			return () => clearInterval(animInterval);
		}
	}, [props.isPlaying]);

	React.useEffect(() => {
		gramophoneIconRef.current.style.rotate = "0deg";
	}, []);

	function handleClick(e) {
		props.onClick(e);
	}

	console.log("BtnPlay");
	return (
		<div className={styles.btnPlayer} onClick={handleClick}>
			<img
				ref={gramophoneIconRef}
				className={`${styles.gramophoneIcon} }`}
				src={gramophoneDiscIcon}
				alt="gramophone icon"
			/>
			{/* playIcon IMAGE */}
			<img
				className={styles.playIcon}
				src={props.isPlaying ? playIcon : pauseIcon}
				alt="play icon"
			/>
		</div>
	);
}

BtnPlay.propTypes = {
	onClick: PropTypes.func,
	isPlaying: PropTypes.bool,
};


export default BtnPlay;