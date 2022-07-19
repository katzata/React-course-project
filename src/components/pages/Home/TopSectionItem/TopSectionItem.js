import { useEffect } from "react";
import styles from "./TopSectionItem.module.css";

import PlatformIcon from "../../../shared/PlatformIcon/PlatformIcon";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faXbox, faPlaystation, faAppStoreIos, faAndroid } from "@fortawesome/free-brands-svg-icons";
// import { faDesktop, faGamepad } from "@fortawesome/free-solid-svg-icons";

function TopSectionItem({ data, offset, index }) {
    const { /* id, */ name, platforms, /* rating, rating_top, */ background_image/* , background_image_additional */ } = data;
    const style = {
        transitionDuration: /* offset !== 0 ?  */".2s"/*  : "0s" */,
        transform: `translateX(${handleOffset()}vw)`,
        zIndex: handleZindex()
    };

    function handleOffset() {
        if (index === 0 || index === 4) {
            if (index === 0 && offset > 1) {
                if (offset < 5) {
                    return 100;
                } else {
                    return 0;
                }
            };

            if (index === 4 && offset === 0) {
                return -500;
            };

            return -(offset * 100);
        } else {
            return -(offset * 100);
        }
    };
    
    function handleZindex() {
        if (index === 0 || index === 4) {
            if (index === 0 && offset > 2) return 3;
            if (index === 0 && offset <= 2) return 0;
        } else {
            if (offset === 0) {
                return -3;
            } else {
                return 0;
            }
        }

        // if (index === 0 && offset > 2) {
        //     return 0;
        // } else {
        //     return -1;
        // };
    };

    return (
        <div style={style} className={styles.topSectionItem}>
            <img src={background_image} alt={name + " cover"}/>

            <h3>{name}</h3>
            
            <h4>
                “Sprawling level design, thrilling combat, and masterful indirect storytelling make Dark Souls 3 the best Dark Souls yet.”
                <br />
                <span><strong>94%</strong> – PC Gamer</span>
            </h4>

            <div className={styles.platformsContainer}>
                {platforms.map(el => <PlatformIcon currentIcon={el.platform.slug} key={el.platform.id}/>)}
            </div>
        </div>
    );
};

export default TopSectionItem;