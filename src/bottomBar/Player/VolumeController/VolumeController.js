import React from "react";
import PropTypes from "prop-types";
import styles from "./VolumeController.module.scss";
import { Volume as Volume0, Volume1, Volume2, VolumeX } from "react-feather";


const VolumeController=React.memo(({ volume, onVolumeChange, onMuteBtnClick })=> {
	const progressContainerRef = React.useRef();
	const [mouseDown, setMouseDown] = React.useState(false);
	const [progress, setProgress] = React.useState();
	React.useEffect(() => {
		const rect = progressContainerRef.current.getBoundingClientRect();
		const progressContainerHeight = rect.bottom - rect.top;
		setProgress((volume * progressContainerHeight) / 1);
	}, []);
	const handleMouseDown = e => {
		setMouseDown(true);
		volumeChange(e);
	};
	const handleMouseUp = () => {
		setMouseDown(false);
	};
	const handleMouseMove = e => {
		if (mouseDown) {
			volumeChange(e);
		}
	};
	const handleMuteBtnClick = e => {
		onMuteBtnClick(e);
		setProgress(volume);
	};

	function volumeChange(e) {
		const rect = progressContainerRef.current.getBoundingClientRect();
		const height = rect.bottom - rect.top;
		let newProgressHeight =
			height -
			((typeof e.touches === "undefined" ? e.clientY : e.touches[0].clientY) -
				rect.top);
		newProgressHeight =
			newProgressHeight < height && newProgressHeight > 0
				? newProgressHeight + 10
				: newProgressHeight;

		newProgressHeight =
			height - newProgressHeight < 1 ? height : newProgressHeight;
		// console.log(newProgressHeight);
		if (newProgressHeight <= height && newProgressHeight >= 0) {
			setProgress(newProgressHeight);
			const volumeToUnit = ((newProgressHeight - 10) * 1) / height;
			onVolumeChange(e, volumeToUnit);
			// console.log(volumeToUnit);
			// console.log(
			// 	`progress container height ${height} mouse position ${newProgressHeight}`
			// );
		}
	}
    console.log("Volume Controller");
	return (
		<div className={styles.volume}>
			<VolumeDynamic volume={volume ?? 1} />
			<div className={styles.volumeSeekBar}>
				<div
					ref={progressContainerRef}
					className={styles.progressContainer}
					onMouseDown={handleMouseDown}
					onMouseUp={handleMouseUp}
					onMouseMove={handleMouseMove}
					onTouchStart={handleMouseDown}
					onTouchEnd={handleMouseUp}
					onTouchMove={handleMouseMove}
					// onTouchCancel
					onMouseLeave={() => setMouseDown(false)}
				>
					<div
						className={styles.progress}
						style={{ height: progress + "px" }}
					></div>
				</div>
				<div className={styles.muteBtn} onClick={handleMuteBtnClick}>
					<VolumeX size={18} />
				</div>
			</div>
		</div>
	);
});

VolumeController.displayName = "VolumeController";

VolumeController.propTypes = {
	volume: PropTypes.number,
	onVolumeChange: PropTypes.func,
	onMuteBtnClick: PropTypes.func,
};


function VolumeDynamic({ volume }) {
	if (volume <= 0) return <VolumeX />;
	else if (volume < 0.1) return <Volume0 />;
	else if (volume <= 0.6) return <Volume1 />;
	else return <Volume2 />;
}

VolumeDynamic.propTypes = {
	volume: PropTypes.number,
};

export default VolumeController;