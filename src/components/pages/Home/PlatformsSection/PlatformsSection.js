import { useState, useEffect } from "react";
import styles from "./PlatformsSection.module.css";

import { getPlatforms } from "../../../../services/catalogueService/catalogueService";

import Spinner from "../../../shared/Spinner/Spinner";
import HomeCard from "../HomeCard/HomeCard";

function PlatformsSection() {
    const [platforms, setPlatforms] = useState(null);
    const [platformsRes, setPlatformsRes] = useState([]);

    function handlePlatformsFilter(e) {
        const filteredPlatforms = platformsRes.filter(el => el.name.toLocaleLowerCase().includes(e.target.value));
        const result = filteredPlatforms.length !== 0 ? filteredPlatforms : platformsRes;
        setPlatforms(result);
    };

    useEffect(() => {
        getPlatforms().then(res => {
            setPlatforms(res);
            setPlatformsRes(res);
        });
    }, []);

    return (
        <section className={styles.platformsSection}>
            <h2>Available platforms</h2>
            
            <div className={styles.filterContainer}>
                <div className={styles.filterInternal}>
                    <span>Filter Platforms</span>
                    <input type="text" onInput={handlePlatformsFilter} />
                </div>
            </div>
            
            {
                platforms 
                ?
                    platforms.map(el => <HomeCard data={el} key={el.id}/>)
                :
                    <Spinner width={"15vw"} color={"rgb(145, 0, 0)"} />
            }
        </section>
    );
};

export default PlatformsSection;