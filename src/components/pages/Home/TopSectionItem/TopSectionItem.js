import styles from "./TopSectionItem.module.css";

import { getIcon } from "../../../../services/catalogueService/catalogueService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXbox, faPlaystation, faAppStoreIos, faAndroid } from "@fortawesome/free-brands-svg-icons";
import { faDesktop, faGamepad } from "@fortawesome/free-solid-svg-icons";

function TopSectionItem({ data }) {
    const { /* id, */ name, platforms, /* rating, rating_top, */ background_image/* , background_image_additional */ } = data;
    const platformIcons = handlePlatformIcons(platforms);

    const icons = {
        xbox: faXbox,
        playstation: faPlaystation,
        pc: faDesktop,
        ios: faAppStoreIos,
        android: faAndroid,
        genesis: faGamepad,
        nintendo: faGamepad,
        gamecube: 1,
        dreamcast: 1,
        switch: 1,

    };

    function handlePlatformIcons(currentPlatforms) {
        const availablePlatforms = ["xbox", "playstation", "pc", "ios"];
        const presentPlatforms = [];

        for (const {platform} of currentPlatforms) {
            for (const available of availablePlatforms) {
                if (platform.slug.includes(available) && !presentPlatforms.includes(available)) {
                    presentPlatforms.push(available);
                };
            };
        };

        return presentPlatforms.sort().reverse();
    };

    return (
        <div className={styles.topSectionItem}>
            <img src={background_image} alt={name + " cover"}/>

            <h3>{name}</h3>
            
            <h4>
                “Sprawling level design, thrilling combat, and masterful indirect storytelling make Dark Souls 3 the best Dark Souls yet.”
                <br />
                <span><strong>94%</strong> – PC Gamer</span>
            </h4>

            <div className={styles.platformsContainer}>
                {platformIcons.map(el => <img src={`./icons/${el}.svg`}/>)}
                {/* {platformIcons.map(el => <FontAwesomeIcon icon={icons[el]} className={styles[el]} key={el} />)} */}
            </div>
        </div>
    );
};

export default TopSectionItem;