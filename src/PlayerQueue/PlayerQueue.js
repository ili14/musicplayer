import React from "react";
import styles from "./PlayerQueue.module.scss";
import { Menu as MenuIc, X } from "react-feather";
import PropTypes from "prop-types";

export default function PlayerQueue() {
    const [isShowMenu, setIsShowMenu] = React.useState(true);

    const handleMenuBtnClick = e => {
        setIsShowMenu(!isShowMenu);
        // alert(isShowMenu)
    };
    return (
        <React.Fragment>
            <MenuBtn onClick={handleMenuBtnClick} isShowMenu={isShowMenu}/>
            <QueueMenu isShow={isShowMenu} />
        </React.Fragment>
    );
}

function MenuBtn(props) {
    const handleClick = e => {
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
    const [display, setDisplay] = React.useState(
        isShow ?? true ? "block" : "none"
    );
    React.useEffect(() => {
        if (isShow) {
            setDisplay("block")
        } else {
            setTimeout(() => {
                setDisplay("none");
            }, 200);
        }
    }, [isShow]);

    return (
        <div
            className={styles.queueMenu}
            style={{ opacity: Number(isShow)}}
        >
            <div className={styles.title}>Queue</div>
        </div>
    );
}

QueueMenu.propTypes = {
    isShow: PropTypes.bool.isRequired,
};
