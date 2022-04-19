import React from "react";
import BtnPlay from "./BtnPlay/BtnPlay";
import styles from "./BottomBar.module.scss";
import PropTypes from "prop-types";
import Player from "./Player/Player";
import MusicContext from "../Contexts/music-context";

const BottomBar = React.memo(
    ({ isPlaying, onClickBtnPlay, isSidebarOpen, onPlayerPlay }) => {
        console.log(`isSidebarOpen => ${isSidebarOpen}`);
        // * music player Context
        const music = React.useContext(MusicContext);

        const [currentMusic, setCurrentMusic] = React.useState({});

        React.useEffect(() => {
            const playList = music.data.playList;
            if (playList.length === 0) return;
            playList.find(value => {
                if (value.isPlaying) {
                    setCurrentMusic(value);
                    return true;
                }
            });
        }, [music.data]);

        const handleEndedPlayer = React.useCallback(
            e => {
                playAtMode(music.data.playMode);
                console.log(music.data.playMode);
            },
            [music.data.playMode, music.data.playList, currentMusic]
        );


        // !TODO how play music (FOR EXAMPLE) -> shuffle | play all | current play | off
        /**
         * for set repeat mode
         * @param {import("../Contexts/music-context").playModeType} mode you must select from 3 constant string ("off" | "playAll" | "shuffle" | "playCurrent")
         */
        const playAtMode = mode => {
            const playList = music.data.playList;
            console.log(playList);
            if (mode === "playAll") {
                // music.setData(prev => ({ ...prev, isPlaying: false }));
                goToNextMusic();
                console.log("go to next music");
                return;
            } else if (mode === "shuffle") {
                return;
            } else {
                music.setData(prev => ({ ...prev, isPlaying: false }));
            }
        };

        // ! Continue playMode feature
        /**
         * when run this function will go to next music
         * @returns {undefined} return nothing
         */
        const goToNextMusic = () => {
            const playList = music.data.playList;
            console.log(playList);
            playList.forEach((currentValue, currentIndex) => {
                console.log(currentValue.id, currentMusic.id);
                if (currentValue.id === currentMusic.id) {
                    const nextMusicIndexWillBePlay =
                        playList.length > currentIndex + 1
                            ? currentIndex + 1
                            : 0;
                            console.log("set next music");
                    const newPlayList = playList;
                    newPlayList[currentIndex].isPlaying = false;
                    newPlayList[nextMusicIndexWillBePlay].isPlaying = true;
                    console.log(playList);
                    setTimeout(() => {
                        music.setData(prev => ({
                            ...prev,
                            playList: newPlayList,
                            isPlaying: true,
                        }));
                    }, 1000);
                    // setCurrentMusic(playList[nextMusicIndexWillBePlay])
                }
                // return true;
            });
        };

        return (
            <div
                className={styles.bottomBar}
                style={{
                    left:
                        isSidebarOpen && window.innerWidth >= 740
                            ? "180px"
                            : "0",
                }}
            >
                <BtnPlay onClick={onClickBtnPlay} isPlaying={isPlaying} />
                <div className={styles.descriptions}>
                    <div className={styles.musicName} alt="fjdla">
                        {currentMusic.musicName ?? "music name"}
                    </div>
                    <div className={styles.artistName}>
                        {currentMusic.artistsName ?? "artist name"}
                    </div>
                </div>
                <Player
                    musicSrc={currentMusic.playLink ?? ""}
                    onPlay={onPlayerPlay}
                    playing={isPlaying}
                    onEnded={handleEndedPlayer}
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
    musicSrc: PropTypes.string,
};

export default BottomBar;
