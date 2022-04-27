import PropTypes from "prop-types";

const types = {
    musicItem : 
        PropTypes.shape({
            id: PropTypes.number,
            image: PropTypes.string,
            musicName: PropTypes.string,
            artistName: PropTypes.string,
            musicLink: PropTypes.string,
            artistLink: PropTypes.string,
            playLink: PropTypes.string,
        })
    ,
    playList : PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            image: PropTypes.string,
            musicName: PropTypes.string,
            artistsName: PropTypes.any,
            musicLink: PropTypes.string,
            artistLink: PropTypes.string,
            playLink: PropTypes.string,
        })
    ),
    // !this playlist have one more property that for check which music is playing
    iterablePlayList : PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            image: PropTypes.string,
            musicName: PropTypes.string,
            artistsName: PropTypes.string,
            musicLink: PropTypes.string,
            artistLink: PropTypes.string,
            playLink: PropTypes.string,
            //! this parameter is for iterate to playlist
            isPlaying: PropTypes.bool
        })
    )
}

export default types;