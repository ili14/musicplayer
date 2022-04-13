import React from "react";
import BtnPlay from "./BtnPlay/BtnPlay";
import styles from "./BottomBar.module.scss";
import PropTypes from "prop-types";
import Player from "./Player/Player";
import MusicContext from "../Contexts/music-context";

const BottomBar = React.memo(
	({
		isPlaying,
		onClickBtnPlay,
		isSidebarOpen,
		onEndedPlayer,
		onPlayerPlay
	}) => {
		console.log(`isSidebarOpen => ${isSidebarOpen}`);
		const music = React.useContext(MusicContext);

		

		return (
			<div
				className={styles.bottomBar}
				style={{
					left: isSidebarOpen && window.innerWidth >= 740 ? "180px" : "0",
				}}
			>
				<BtnPlay onClick={onClickBtnPlay} isPlaying={isPlaying} />
				<div className={styles.descriptions}>
					<div className={styles.musicName}>Music Name</div>
					<div className={styles.artistName}>Artist Name</div>
				</div>
					<Player
						musicSrc={music.data.musicSrc}
						onPlay={onPlayerPlay}
						playing={isPlaying}
						onEnded={onEndedPlayer}
					/>
			</div>
		);
	}
);

BottomBar.displayName = "BottomBar";

BottomBar.propTypes = {
	isPlaying: PropTypes.bool.isRequired,
	onClickBtnPlay: PropTypes.func,
	onPlayerPlay: PropTypes.func,
	isSidebarOpen: PropTypes.bool.isRequired,
	onEndedPlayer: PropTypes.func,
	artistName: PropTypes.string,
	musicName: PropTypes.string,
	musicSrc: PropTypes.string
};

export default BottomBar;
