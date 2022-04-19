// @ts-check
import React from "react";

/**
 * @typedef {"off" | "shuffle" | "playAll" | "playCurrent"} playModeType
 */

/**
 * @typedef MusicContextDataType
 * @type {Object}
 * @property {object[]} playList
 * @property {boolean} isPlaying
 * @property {playModeType} playMode
 */

/**
 * @typedef MusicContextType
 * @type {object}
 * @property {MusicContextDataType} data
 * @property {(data: MusicContextDataType)=>void} setData
 */

/**
 * @type {MusicContextType}
 */
const MusicContextDefaultValues = {
    data: {
        playList: [{}],
        isPlaying: false,
        playMode: "playAll",
    },
    setData: data => {},
};

const MusicContext = React.createContext(MusicContextDefaultValues);

export default MusicContext;
