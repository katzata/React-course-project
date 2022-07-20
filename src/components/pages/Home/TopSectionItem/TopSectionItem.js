// import { useEffect } from "react";
import styles from "./TopSectionItem.module.css";

import PlatformIcon from "../../../shared/PlatformIcon/PlatformIcon";

function TopSectionItem({ data, offset, index }) {
    const { /* id, */ name, platforms, /* rating, rating_top, */ background_image/* , background_image_additional */ } = data;
    const style = {
        transitionDuration: ".5s",
        transitionTimingFunction: "ease-out",
        transform: `translateX(${handleOffset()}vw)`,
        zIndex: handleZindex()
    };

    function handleOffset() {
        if (index === 0 || index === 4) {
            if (index === 0 && offset > 1) {
                return offset < 5 ? 100 : 0;
            };

            if (index === 4 && offset === 0) return -500;

            return -(offset * 100);
        };

        return -(offset * 100);
    };
    
    function handleZindex() {
        if (index === 0 && offset > 2) return 3;
        if (index === 0 && offset <= 2) return 0;
        if (index === 4) {
            return offset >= 0 && offset <= 2 ? -3 : 0;
        };

        return offset === 0 ? -3 : 0;
    };

    function sortedPlatforms() {
        return platforms.sort((a, b) => a.platform.slug.localeCompare(b.platform.slug));
        return platforms;
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
                {sortedPlatforms().map(el => <PlatformIcon currentIcon={el.platform.slug} key={el.platform.id}/>)}
            </div>
        </div>
    );
};

export default TopSectionItem;