// import { useState, useEffect } from "react";
import styles from "./TopSectionItem.module.css";

import PlatformIcon from "../../../shared/PlatformIcon/PlatformIcon";
import EsrbIcon from "../../../shared/EsrbIcon/EsrbIcon";

function TopSectionItem({ data, offset, index }) {
    const { /* id, */ name, alternative_names, description_raw, platforms, esrb_rating, rating, rating_top, background_image/* , background_image_additional */ } = data;
    // const [duration, setDuration] = useState(0);

    const style = {
        transitionDuration: `${handleDuration()}s`,
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
    
    function handleDescription() {
        const end = description_raw.indexOf(". ");
        return description_raw[end] ? description_raw.slice(0, end) + "..."  : description_raw;
    };

    function ratingStyle() {
        return { color: `rgb(${255 - rating * 51}, ${rating * 51}, 0)` };
    };

    function sortedPlatforms() {
        return platforms.sort((a, b) => a.platform.slug.localeCompare(b.platform.slug));
    };

    function handleDuration() {
        if (offset === index || (offset - 1) === index || offset === 0) {
            return ".2";
        } else {
            return "0";
        };
    };

    // useEffect(() => {
    //     if (offset === index || (offset - 1) === index || offset === 0) {
    //         // setDuration(.2);
    //     } else {
    //         console.log("x", index);
    //         // setDuration(0);
    //     };

    //     // return () => setDuration(0);
    // }, [offset, index])

    return (
        <section style={style} className={styles.topSectionItem} /* onTransitionEnd={() => setDuration(0)} */>
            <img src={background_image} alt={name + " cover"}/>

            <h3>{alternative_names.length === 0 ? name : `${name} / ` + alternative_names.join("/")}</h3>
            
            <article className={styles.infoContainer}>
                <EsrbIcon icon={esrb_rating && esrb_rating.slug ? esrb_rating.slug : "mature"} />

                <p>{handleDescription()}
                    
                    <span>
                        Rating
                        <strong style={ratingStyle()}>
                            {rating} / {rating_top}
                        </strong>
                    </span>
                </p>
            </article>

            <div className={styles.platformsContainer}>
                {sortedPlatforms().map(el => {
                    return <a href={"/platforms/" + el.platform.slug} key={el.platform.id}>
                        <PlatformIcon icon={el.platform.slug} />
                    </a>
                })}
            </div>
        </section>
    );
};

export default TopSectionItem;