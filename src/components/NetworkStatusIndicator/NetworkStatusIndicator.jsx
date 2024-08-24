import React, { useCallback, useMemo } from "react";
import useNavigatorOnLine from "../../hooks/useNavigatorOnLine";
import styles from "./NetworkStatusIndicator.module.scss";
import noWifiIcon from "assets/icons/no-wifi-icon.png";
import LeftArrowIcon from "../../assets/icons/leftArrow.png";
import propTypes from "prop-types"

const NetworkStatusIndicator = () => {
  const online = useNavigatorOnLine();
  const [isContinue, setIsContinue] = React.useState(false);

  const handleContinueBtn = useCallback(()=>{
    setIsContinue(true);
  },[])

  return (
    <div className={styles.networkStatusIndicator} style={{ display: online || isContinue ? "none" : undefined }}>
      <div className={styles.into}>
        <span>اتصال به اینترنت قطع است</span>
        <img className={styles.image} src={noWifiIcon} alt="آیکون آفلاین" />
      </div>
      <button className={styles.continueBtn} onClick={handleContinueBtn}>
        <img src={LeftArrowIcon} alt="" className={styles.icon}/>
        ادامه به همین صورت
      </button>
    </div>
  );
};

export default NetworkStatusIndicator;
