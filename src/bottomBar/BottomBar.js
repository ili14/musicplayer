import React from "react";
import BtnPlay from "./BtnPlay/BtnPlay";
import styles from "./BottomBar.module.scss";
import PropTypes from "prop-types";
import Player from "./Player/Player";
import MusicContext from "../Contexts/music-context";

const reducerTypes = {
    canPlay: "can play",
    cantPlay: "can't play",
    repeatOn: "On Repeating",
    repeatOff: "Off Repeating",
};

function reducer(state, action) {
    action.type;
    switch (action.type) {
        case reducerTypes.canPlay:
            return { ...state, canPlay: true };
        case reducerTypes.cantPlay:
            return { ...state, canPlay: false };
        case reducerTypes.repeatOn:
            return { ...state, isRepeating: true };
        case reducerTypes.repeatOff:
            return { ...state, isRepeating: false };
    }
}

const initialStates = {
    canPlay: false,
    isRepeating: false,
};

const BottomBar = React.memo(
    ({ isPlaying, onClickBtnPlay, isSidebarOpen, onPlayerPlay }) => {
        console.log(`isSidebarOpen => ${isSidebarOpen}`);
        // * music player Context
        const music = React.useContext(MusicContext);
        const [currentMusic, setCurrentMusic] = React.useState({});
        const [states, dispatchStates] = React.useReducer(
            reducer,
            initialStates
        );

        React.useEffect(() => {
            const playList = music.data.playList;
            if (playList.length === 0) return;
            setCurrentMusic(playList.find(value => value.isPlaying));
        }, [music.data]);

        const handleClickBtnPlay = React.useCallback(
            e => {
                onClickBtnPlay(e, states.canPlay);
            },
            [states.canPlay]
        );

        const handleEndedPlayer = React.useCallback(
            e => {
                playAtMode(music.data.playMode);
                console.log(music.data.playMode);
            },
            [music.data.playMode, music.data.playList, currentMusic]
        );

        const handleCanPlay = React.useCallback(e => {
            dispatchStates({ type: reducerTypes.canPlay });
        }, []);

        const handlePlayerWaiting = React.useCallback(() => {
            dispatchStates({ type: reducerTypes.cantPlay });
        }, []);

        // !TODO how play music (FOR EXAMPLE) -> shuffle | play all | current play | off
        /**
         * for set repeat mode
         * @param {import("../Contexts/music-context").playModeType} mode you must select from 3 constant string ("off" | "playAll" | "shuffle" | "playCurrent")
         */
        const playAtMode = mode => {
            const playList = music.data.playList;
            console.log(playList);
            if (mode === "playAll") {
                goToNextMusic();
            } else if (mode === "shuffle") {
                goToShuffleMusic();
                return;
            } else if (mode === "playCurrent") {
                dispatchStates({type: reducerTypes.repeatOn});
                return;
            } else {
                music.setData(prev => ({ ...prev, isPlaying: false }));
            }
            
            if (mode !== "playCurrent") {
                dispatchStates({type: reducerTypes.repeatOff});
                return;
            }
            // music.setData(prev => ({ ...prev, isPlaying: false }));
        };

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
                    music.setData(prev => ({
                        ...prev,
                        playList: newPlayList,
                        isPlaying: true,
                    }));
                    // setCurrentMusic(playList[nextMusicIndexWillBePlay])
                }
                // return true;
            });
        };

        /**
         * when run this function will play random music
         */
        const goToShuffleMusic = () => {
            const playList = music.data.playList;
            const lastMusicIndex = playList.length - 1;
            let currentMusicIndex = -1;

            // find current music is playing and set to false for stop
            playList.find((value, index) => {
                if (value.isPlaying) {
                    playList[index].isPlaying = false;
                    currentMusicIndex = index;
                    return true;
                }
            });

            // get new music index in range playlist
            let randomIndex = Math.floor(Math.random() * lastMusicIndex) + 0;
            while (randomIndex === currentMusicIndex) {
                randomIndex = Math.floor(Math.random() * lastMusicIndex) + 0;
            }

            // set new random music to true for play
            playList[randomIndex].isPlaying = true;

            music.setData(prev => ({
                ...prev,
                playList,
                isPlaying: true,
            }));
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
                <BtnPlay onClick={handleClickBtnPlay} isPlaying={isPlaying} />
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
                    onCanPlay={handleCanPlay}
                    onWaiting={handlePlayerWaiting}
                    isRepeating={states.isRepeating}
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
