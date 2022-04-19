import PropTypes from "prop-types";
import React from "react";
import styles from "./MusicRow.module.scss";
import { ChevronRight, Play as PlayIcon } from "react-feather";
import customPropTypes from "../../customPropTypes/customPropTypes";

function MusicRow(props) {
	let {
		// ! for get all music for play all music
		playList,
		headerTitle,
		seeAllLink,
		playAllBtnText,
		seeAllBtnText,
		onItemPlayMusic,
		onPlayAll
	} = props;

	const handlePlayAll = (e)=>{
		onPlayAll(e, playList)
	}

	// const handlePlayMusic = (e, playLink) => {

	// };

	return (
		<div className={styles.scope}>
			{/* 
			// * this is header ↓
			*/}
			<div className={styles.header}>
				<div className={styles.title}>{headerTitle}</div>
				<div className={styles.right}>
					<div className={styles.playAllBtn} onClick={handlePlayAll}>
						{playAllBtnText ?? "Play All"}
						<PlayIcon size={16} />
					</div>
					<a href={seeAllLink} className={styles.seeAllBtn}>
						{seeAllBtnText ?? "See All"}
						<ChevronRight />
					</a>
				</div>
			</div>
			{/* 
			// * this is items container ↓
			*/}
			<div className={styles.itemsContainer}>
				{playList.map(item => {
					return (
						<Item item={item} onPlayMusic={onItemPlayMusic} key={item.id} />
					);
				})}
			</div>
		</div>
	);
}

MusicRow.propTypes = {
	playList: customPropTypes.playList,
	headerTitle: PropTypes.string,
	seeAllLink: PropTypes.string,
	playAllBtnText: PropTypes.string,
	seeAllBtnText: PropTypes.string,
	onItemPlayMusic: PropTypes.func,
	onPlayAll: PropTypes.func
};

function Item({ item, onPlayMusic }) {
	const { id, image, musicName, artistsName, musicLink, artistLink, playLink } =
		item;

	const handleClickPlayBtn = e => {
		const musicItem = item;
		onPlayMusic(e, musicItem);
	};
	const getArtistsNames = () => {
		if (typeof artistsName === "string") {
			return artistsName;
		} else if (Array.isArray(artistsName)) {
			return artistsName.join(" & ");
		}
	}
	return (
		<div className={styles.item}>
			<a href={musicLink} className={styles.topLink}>
				<img src={image} alt="image" className={styles.image} />
			</a>
			<div className={styles.bottomScop}>
				<div className={styles.playBtn} onClick={handleClickPlayBtn}>
					<PlayIcon size={18} />
				</div>
				<div className={styles.details}>
					<a href={musicLink} className={styles.musicName}>
						{musicName}
					</a>
					<a href={artistLink} className={styles.artistName}>
						{/* {" ad"} */}
						{/* {(() => {<div>Hello World </div>})()}
						{()=>" hello"} */}
						{getArtistsNames()}
					</a>
				</div>
			</div>
		</div>
	);
}
Item.propTypes = {
	item: PropTypes.shape({
		id: PropTypes.number,
		image: PropTypes.string,
		musicName: PropTypes.string,
		artistsName: PropTypes.any,
		musicLink: PropTypes.string,
		artistLink: PropTypes.string,
		playLink: PropTypes.string,
	}),
	onPlayMusic: PropTypes.func,
};

export default MusicRow;
