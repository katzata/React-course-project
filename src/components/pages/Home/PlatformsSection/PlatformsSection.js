import { useState, useEffect } from "react";
import styles from "./PlatformsSection.module.css";

import { getPlatforms } from "../../../../services/catalogueService/catalogueService";

import Spinner from "../../../shared/Spinner/Spinner";
import HomeCard from "../HomeCard/HomeCard";

function PlatformsSection() {
    const [platforms, setPlatforms] = useState(null);

    useEffect(() => {
        getPlatforms().then(res => {
            setPlatforms(res);
        })
    }, []);

    return (
        <section className={styles.platformsSection}>
            <h2>Available platforms</h2>
            
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