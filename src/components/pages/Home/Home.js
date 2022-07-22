// import { useEffect, useState } from "react";
import styles from "./Home.module.css";

import TopSection from "./TopSection/TopSection";
import PlatformsSection from "./PlatformsSection/PlatformsSection";

function Home() {
    // const [recommended, setRecommended] = useState([]);
    // const [platforms, setPlatforms] = useState([]);

    return (
        <section className={styles.home}>
            <TopSection />
            <PlatformsSection />
            {/* {platforms.map(el => <HomeCard data={el} key={el.name}/>)} */}
        </section>
    );
}

export default Home;