import React from "react";
import styles from "./PlayerQueue.module.scss";
import { Menu as MenuIc, X, Repeat as PlayAllIc, Shuffle as ShuffleIc, XCircle as OffIc, CornerRightDown as PlayCurrentIc, Circle as CircleIc } from "react-feather";
import PropTypes from "prop-types";
import MusicContext from "../Contexts/music-context";
import styled from "styled-components";
import playIcon from "assets/icons/play.png";

export default function PlayerQueue() {
  const [isShowMenu, setIsShowMenu] = React.useState(false);

  const handleMenuBtnClick = (e) => {
    setIsShowMenu(!isShowMenu);
    // alert(isShowMenu)
  };
  return (
    <React.Fragment>
      <MenuBtn onClick={handleMenuBtnClick} isShowMenu={isShowMenu} />
      <QueueMenu isShow={isShowMenu} />
    </React.Fragment>
  );
}

function MenuBtn(props) {
  const handleClick = (e) => {
    if (typeof props.onClick === "function") props.onClick(e);
  };

  // const Dynamic

  return (
    <div className={styles.menuBtn} onClick={handleClick}>
      {props.isShowMenu ? <X /> : <MenuIc />}
    </div>
  );
}

MenuBtn.propTypes = {
  onClick: PropTypes.func,
  isShowMenu: PropTypes.bool.isRequired,
};

function QueueMenu({ isShow }) {
  const musicContext = React.useContext(MusicContext);
  const [display, setDisplay] = React.useState(isShow ?? true ? "block" : "none");
  React.useEffect(() => {
    if (isShow) {
      setDisplay("block");
    } else {
      setTimeout(() => {
        setDisplay("none");
      }, 200);
    }
  }, [isShow]);

  const handlePosMenuItemClick = (e, index, item) => {
    switch (index) {
      case 0:
        musicContext.setData((prev) => ({ ...prev, playMode: "off" }));
        break;
      case 1:
        musicContext.setData((prev) => ({ ...prev, playMode: "playAll" }));
        break;
      case 2:
        musicContext.setData((prev) => ({ ...prev, playMode: "playCurrent" }));
        break;
      case 3:
        musicContext.setData((prev) => ({ ...prev, playMode: "shuffle" }));
    }
  };

  const playModeItems = [
    { title: "Off", before: <OffIc size={20} /> },
    { title: "Play All", before: <PlayAllIc size={20} /> },
    { title: "Play Current", before: <PlayCurrentIc size={20} /> },
    { title: "Shuffle", before: <ShuffleIc size={20} /> },
  ];

  return (
    <div className={styles.queueMenu} style={{ opacity: Number(isShow), display }}>
      <div className={styles.top}>
        <div className={styles.title}>
          <MenuIc size={16} className="mr-1" />
          Queue
        </div>
      </div>

      <div className={styles.body}>
        <div style={{zIndex: 100}}>
          <PosMenu rootBtn={<DynamicPlayModeIc playMode={musicContext.data.playMode} />} items={playModeItems} onItemClick={handlePosMenuItemClick} />
        </div>
        <div className={styles.queueList}>
          {musicContext.data.playList.map((cuMusic, index) => {
            return (
              <div className={`${styles.item} ${cuMusic.isPlaying ? styles.itemIsPlaying : ""}`} key={index}>
                <img src={cuMusic.image} alt={cuMusic.musicName} className={styles.coverImage} />
                <span>{cuMusic.musicName}</span>
                <img
                  src={playIcon}
                  className={`${styles.playIcon} ${cuMusic.isPlaying ? styles.playIconPlay : ""}`}
                  onClick={() => {
                    const newPlayList = musicContext.data.playList.map((music, i) => {
                      if (i === index) {
                        return {
                          ...music,
                          isPlaying: true,
                        };
                      }
                      return { ...music, isPlaying: false };
                    });
                    musicContext.setData((prev) => ({ ...prev, isPlaying: true, playList: newPlayList }));
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

QueueMenu.propTypes = {
  isShow: PropTypes.bool.isRequired,
};

/**
 *
 * @param {{items: Array<{before: any: string}>}} param0
 * @returns
 */
function PosMenu({ children, rootBtn, items = [], onItemClick }) {
  const [isShowMenu, setIsShowMenu] = React.useState(false);
  const containerRef = React.useRef();

  const handelClickRootBtn = (e) => {
    setIsShowMenu((prev) => !prev);
  };

  React.useEffect(function () {
    document.addEventListener("click", function (e) {
      if (!containerRef.current.contains(e.target)) {
        setIsShowMenu(false);
      }
    });
  }, []);

  return (
    <div style={{ width: "fit-content", height: "fit-content", zIndex: 100 }} ref={containerRef}>
      <div className={styles.posMenuRootBtn} onClick={handelClickRootBtn}>
        {rootBtn}
      </div>
      <div
        className={styles.posMenu}
        style={{
          display: isShowMenu ? "block" : "none",
        }}
      >
        {children ?? (
          <>
            {items.map((item, index) => {
              const handleClick = (e) => {
                onItemClick(e, index, item);
              };
              return (
                <div key={index} onClick={handleClick} className={styles.item}>
                  <div style={{ marginRight: "10px" }}>{item.before}</div>
                  <div>{item.title}</div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

PosMenu.propTypes = {
  children: PropTypes.any,
  rootBtn: PropTypes.element,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      before: PropTypes.any,
      title: PropTypes.string,
    })
  ),
  onItemClick: PropTypes.func,
};

/**
 *
 * @param {{playMode: import("../Contexts/music-context").playModeType}} param0
 */
function DynamicPlayModeIc({ playMode }) {
  switch (playMode) {
    case "off":
      return <OffIc />;
    case "playAll":
      return <PlayAllIc />;
    case "playCurrent":
      return <PlayCurrentIc />;
    case "shuffle":
      return <ShuffleIc />;
    default:
      break;
  }
}

DynamicPlayModeIc.propTypes = {
  playMode: PropTypes.string,
};
