import PropTypes from "prop-types";
import React from "react";
import styles from "./Player.module.scss";
import VolumeController from "./VolumeController/VolumeController";

const Player = React.memo(
    ({ playing, musicSrc, onSeek, onEnded, onPlay = () => {}, onCanPlay, onWaiting, isRepeating=false}) => {
        const [playerStates, setPlayerStates] = React.useState({
            progressVal: 0,
            progressWidth: 0,
            currentTime: "00:00",
            duration: "--:--",
            volume: 1,
            canPlay: false
        });
        const seekBarPointerRef = React.useRef();
        const progressRef = React.useRef();
        const audioRef = React.useRef();
        const seekBarRef = React.useRef();

        const handleSeekBarMouseMove = e => {
            let rect = e.target.getBoundingClientRect();
            let left = e.clientX - rect.left;
            seekBarPointerRef.current.style.left = left + "px";
        };
        const handleSeekBarMouseLeave = () => {
            seekBarPointerRef.current.style.display = "none";
        };
        const handleSeekBarMouseEnter = () => {
            seekBarPointerRef.current.style.display = "flex";
        };
        const handleSeekBarClick = e => {
            const seekBarRect = e.target.getBoundingClientRect();
            const seekBarWidth = seekBarRect.right - seekBarRect.left;
            let progressWidth = e.clientX - seekBarRect.left;
            progressRef.current.style.width = progressWidth + "px";
            let value = progressWidth;
            if (typeof onSeek !== "undefined") onSeek(e, value);
            audioRef.current.currentTime =
                (progressWidth * audioRef.current.duration) / seekBarWidth;
        };
        const handleSeekBarTouchMove = e => {
            const seekBarRect = e.target.getBoundingClientRect();
            const seekBarWidth = seekBarRect.right - seekBarRect.left;
            let newSeekBarPointerMarginLeft =
                e.touches[0].clientX - seekBarRect.left;
            if (
                newSeekBarPointerMarginLeft <= seekBarWidth &&
                newSeekBarPointerMarginLeft >= 0
            )
                seekBarPointerRef.current.style.marginLeft =
                    newSeekBarPointerMarginLeft + "px";

            seekBarRef.lastTouch = e.touches;
        };
        const handleSeekBarTouchEnd = e => {
            const seekBarRect = e.target.getBoundingClientRect();
            const seekBarPointerRect =
                seekBarPointerRef.current.getBoundingClientRect();
            const seekBarWidth = seekBarRect.right - seekBarRect.left;
            let progressWidth = seekBarPointerRect.left - seekBarRect.left;
            progressRef.current.style.width = progressWidth + "px";
            let value = progressWidth;
            if (typeof onSeek !== "undefined") onSeek(e, value);
            audioRef.current.currentTime =
                (progressWidth * audioRef.current.duration) / seekBarWidth;
            seekBarPointerRef.current.style.display = "none";
        };
        const handleUpdateTime = () => {
            let currentTime = Math.round(audioRef.current.currentTime);
            let seconde = currentTime % 60;
            let minute = Math.floor(currentTime / 60);
            seconde = seconde < 10 ? "0" + String(seconde) : seconde;
            minute = minute < 10 ? "0" + String(minute) : minute;
            currentTime = minute + ":" + seconde;
            setPlayerStates(prev => ({ ...prev, currentTime }));

            let seekBarRec = seekBarRef.current.getBoundingClientRect();
            let seekBarWidth = seekBarRec.right - seekBarRec.left;
            let currentTimeToSeconde = Math.round(audioRef.current.currentTime);
            let durationToSeconde = audioRef.current.duration;
            let progressWidth =
                (currentTimeToSeconde * seekBarWidth) / durationToSeconde;
            setPlayerStates(prev => ({
                ...prev,
                progressWidth: progressWidth + "px",
            }));
            // console.log(percentDuration+"px");
            // console.log(seekBarWidth);
        };
        const handleLoadedData = () => {
            let duration = Math.round(audioRef.current.duration);
            let seconde = duration % 60;
            let minute = Math.floor(duration / 60);
            seconde = seconde < 10 ? "0" + String(seconde) : seconde;
            minute = minute < 10 ? "0" + String(minute) : minute;
            duration = minute + ":" + seconde;
            setPlayerStates({ ...playerStates, duration });
        };
        const handleEnded = e => {
            if(isRepeating){
                setPlayerStates(prev=>({
                    ...prev,
                    currentTime: "00:00",
                    progressWidth: 0,
                }))
                if(playing && playerStates.canPlay) audioRef.current.play();
                return true;
            }
            
            onEnded(e);
        };
        const handleMuteBtnClick = React.useCallback(() => {
            setPlayerStates(prev => ({ ...prev, volume: 0 }));
        }, []);
        const handleVolumeChange = React.useCallback((e, volume) => {
            setPlayerStates(prev => ({ ...prev, volume: volume }));
        }, []);

        const handleCanPlay = React.useCallback((e) => {
            if (playing) {
                audioRef.current.play();
            } else audioRef.current.pause();
            console.log("stop music");
            onCanPlay(e);
            setPlayerStates(prev=>({...prev,canPlay: true}))
        }, [playing]);

        const handleWaiting = React.useCallback(e=>{
            onWaiting(e);
            setPlayerStates(prev=>({...prev,canPlay: false}))
        });

        React.useEffect(() => {
            if (playing && audioRef.current.readyState) {
                audioRef.current.play();
                console.log("play music");
            } else audioRef.current.pause();
            console.log("stop music");
        }, [playing]);

        React.useEffect(() => {
            audioRef.current.volume = playerStates.volume;
        }, [playerStates.volume]);

        React.useEffect(() => {
            setPlayerStates(prev => ({
                ...prev,
                currentTime: "00:00",
                progressWidth: 0,
                duration: "--:--",
            }));
            if (playing && audioRef.current.readyState) audioRef.current.play();
        }, [musicSrc]);

        console.log("Player");

        return (
            <div className={styles.container}>
                <div
                    className={styles.seekBar}
                    onMouseMove={handleSeekBarMouseMove}
                    onMouseLeave={handleSeekBarMouseLeave}
                    onMouseEnter={handleSeekBarMouseEnter}
                    onClick={handleSeekBarClick}
                    onTouchStart={handleSeekBarMouseEnter}
                    onTouchEnd={handleSeekBarTouchEnd}
                    onTouchMove={handleSeekBarTouchMove}
                    ref={seekBarRef}
                >
                    <div
                        className={styles.pointer}
                        ref={seekBarPointerRef}
                    ></div>
                    <div
                        className={styles.progress}
                        ref={progressRef}
                        style={{ width: playerStates.progressWidth }}
                    ></div>
                    <video
                        style={{ display: "none" }}
                        src={musicSrc}
                        ref={audioRef}
                        volume={playerStates.volume}
                        onTimeUpdate={handleUpdateTime}
                        onLoadedData={handleLoadedData}
                        onEnded={handleEnded}
                        onPlay={() => {
                            onPlay();
                        }}
                        onCanPlay={handleCanPlay}
                        onWaiting={handleWaiting}
                    ></video>
                </div>
                <div className={styles.duration}>
                    {playerStates.currentTime}
                    <span className="text-gray">/{playerStates.duration}</span>
                </div>
                <VolumeController
                    volume={playerStates.volume}
                    onVolumeChange={handleVolumeChange}
                    onMuteBtnClick={handleMuteBtnClick}
                />
            </div>
        );
    }
);

Player.displayName = "Player";

Player.propTypes = {
    playing: PropTypes.bool,
    musicSrc: PropTypes.string.isRequired,
    onSeek: PropTypes.func,
    onEnded: PropTypes.func,
    onPlay: PropTypes.func,
    onCanPlay: PropTypes.func,
    onWaiting: PropTypes.func,
    isRepeating: PropTypes.bool
};

function getPercent(wholeNum, num) {
    return (num * 100) / wholeNum;
}

export default Player;
